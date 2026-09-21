<?php

namespace App\Filters;

use App\Models\UserTokenModel;
use App\Models\UserModel;
use CodeIgniter\HTTP\RequestInterface;
use CodeIgniter\HTTP\ResponseInterface;
use CodeIgniter\Filters\FilterInterface;

class AuthFilter implements FilterInterface
{
    public function before(
        RequestInterface $request,
        $arguments = null
    ) {
        $header = $request->getHeaderLine('Authorization');

        if (!$header || !preg_match('/Bearer\s+(.+)/i', $header, $matches)) {
            return service('response')
                ->setStatusCode(401)
                ->setJSON([
                    'status' => false,
                    'message' => 'กรุณาเข้าสู่ระบบ'
                ]);
        }

        $token = trim($matches[1]);

        $tokenModel = new UserTokenModel();

        $tokenData = $tokenModel
            ->where('token', $token)
            ->first();

        if (!$tokenData) {
            return service('response')
                ->setStatusCode(401)
                ->setJSON([
                    'status' => false,
                    'message' => 'Token ไม่ถูกต้อง'
                ]);
        }

        // ตรวจสอบวันหมดอายุ
        if (
            !empty($tokenData['expires_at']) &&
            strtotime($tokenData['expires_at']) < time()
        ) {
            $tokenModel->delete($tokenData['token_id']);

            return service('response')
                ->setStatusCode(401)
                ->setJSON([
                    'status' => false,
                    'message' => 'Token หมดอายุ'
                ]);
        }

        // ดึงข้อมูล User
        $userModel = new UserModel();

        $user = $userModel->find($tokenData['user_id']);

        if (!$user) {
            return service('response')
                ->setStatusCode(401)
                ->setJSON([
                    'status' => false,
                    'message' => 'ไม่พบผู้ใช้งาน'
                ]);
        }

        if (($user['status'] ?? '') !== 'ใช้งาน') {
            return service('response')
                ->setStatusCode(403)
                ->setJSON([
                    'status' => false,
                    'message' => 'บัญชีผู้ใช้งานถูกระงับ'
                ]);
        }

        // ส่งข้อมูล User ต่อให้ Controller / Filter อื่น
        $request->user = $user;
        $request->userId = $user['user_id'];
        $request->userRole = $user['role'];
    }

    public function after(
        RequestInterface $request,
        ResponseInterface $response,
        $arguments = null
    ) {
    }
}