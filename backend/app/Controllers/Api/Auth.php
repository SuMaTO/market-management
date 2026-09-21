<?php

namespace App\Controllers\Api;

use App\Controllers\BaseController;
use App\Models\UserModel;
use App\Models\UserTokenModel;

class Auth extends BaseController
{
    protected UserModel $userModel;
    protected UserTokenModel $tokenModel;

    public function __construct()
    {
        $this->userModel = new UserModel();
        $this->tokenModel = new UserTokenModel();
    }

    // POST /api/login
    public function login()
    {
        $data = $this->request->getJSON(true);

        if (!$data) {
            return $this->response
                ->setStatusCode(400)
                ->setJSON([
                    'status' => false,
                    'message' => 'ข้อมูลไม่ถูกต้อง'
                ]);
        }

        $username = trim($data['username'] ?? '');
        $password = $data['password'] ?? '';

        // ตรวจสอบข้อมูลที่ส่งมา
        if ($username === '' || $password === '') {
            return $this->response
                ->setStatusCode(400)
                ->setJSON([
                    'status' => false,
                    'message' => 'กรุณากรอก Username และ Password'
                ]);
        }

        // ค้นหา User
        $user = $this->userModel
            ->where('username', $username)
            ->first();

        if (!$user) {
            return $this->response
                ->setStatusCode(401)
                ->setJSON([
                    'status' => false,
                    'message' => 'Username หรือ Password ไม่ถูกต้อง'
                ]);
        }

        // ตรวจสอบสถานะบัญชี
        if (($user['status'] ?? '') !== 'ใช้งาน') {
            return $this->response
                ->setStatusCode(403)
                ->setJSON([
                    'status' => false,
                    'message' => 'บัญชีผู้ใช้งานถูกระงับ'
                ]);
        }

        // ตรวจสอบ Password
        if (!password_verify($password, $user['password'])) {
            return $this->response
                ->setStatusCode(401)
                ->setJSON([
                    'status' => false,
                    'message' => 'Username หรือ Password ไม่ถูกต้อง'
                ]);
        }

        // สร้าง Token
        $token = bin2hex(random_bytes(32));

        // Token อายุ 1 วัน
        $expiresAt = date(
            'Y-m-d H:i:s',
            time() + (24 * 60 * 60)
        );

        // บันทึก Token ลง user_tokens
        $this->tokenModel->insert([
            'user_id'    => $user['user_id'],
            'token'      => $token,
            'expires_at' => $expiresAt,
            'created_at' => date('Y-m-d H:i:s'),
        ]);

        // ไม่ส่ง Password กลับไป Frontend
        unset($user['password']);

        return $this->response->setJSON([
            'status' => true,
            'message' => 'เข้าสู่ระบบสำเร็จ',

            'token' => $token,

            'expires_at' => $expiresAt,

            'user' => $user
        ]);
    }
}