<?php

namespace App\Controllers\Api;

use App\Controllers\BaseController;
use App\Models\UserModel;

class Users extends BaseController
{
    protected $userModel;

    public function __construct()
    {
        $this->userModel = new UserModel();
    }

    // GET /api/users
    public function index()
    {
        $users = $this->userModel
            ->select('user_id, username, full_name, role, phone, email, status, created_at')
            ->orderBy('user_id', 'DESC')
            ->findAll();

        return $this->response->setJSON([
            'status' => true,
            'data' => $users
        ]);
    }

    // GET /api/users/:id
    public function show($id)
    {
        $user = $this->userModel
            ->select('user_id, username, full_name, role, phone, email, status, created_at')
            ->find($id);

        if (!$user) {
            return $this->response
                ->setStatusCode(404)
                ->setJSON([
                    'status' => false,
                    'message' => 'ไม่พบข้อมูลผู้ใช้งาน'
                ]);
        }

        return $this->response->setJSON([
            'status' => true,
            'data' => $user
        ]);
    }

    // POST /api/users
    public function create()
    {
        $data = $this->request->getJSON(true);

        if (empty($data['username']) || empty($data['password'])) {
            return $this->response
                ->setStatusCode(400)
                ->setJSON([
                    'status' => false,
                    'message' => 'กรุณากรอก Username และ Password'
                ]);
        }

        // ตรวจสอบ Username ซ้ำ
        $existingUser = $this->userModel
            ->where('username', $data['username'])
            ->first();

        if ($existingUser) {
            return $this->response
                ->setStatusCode(409)
                ->setJSON([
                    'status' => false,
                    'message' => 'Username นี้มีอยู่แล้ว'
                ]);
        }

        // ตรวจสอบ Role
        $allowedRoles = ['admin', 'staff', 'manager'];

        if (
            !empty($data['role']) &&
            !in_array($data['role'], $allowedRoles)
        ) {
            return $this->response
                ->setStatusCode(400)
                ->setJSON([
                    'status' => false,
                    'message' => 'Role ไม่ถูกต้อง'
                ]);
        }

        $userData = [
            'username'   => $data['username'],
            'password'   => password_hash($data['password'], PASSWORD_DEFAULT),
            'full_name'  => $data['full_name'] ?? '',
            'role'       => $data['role'] ?? 'staff',
            'phone'      => $data['phone'] ?? '',
            'email'      => $data['email'] ?? '',
            'status'     => $data['status'] ?? 'ใช้งาน',
            'created_at' => date('Y-m-d H:i:s'),
        ];

        $this->userModel->insert($userData);

        return $this->response
            ->setStatusCode(201)
            ->setJSON([
                'status' => true,
                'message' => 'เพิ่มผู้ใช้งานสำเร็จ',
                'user_id' => $this->userModel->getInsertID()
            ]);
    }

    // PUT /api/users/:id
    public function update($id)
    {
        $user = $this->userModel->find($id);

        if (!$user) {
            return $this->response
                ->setStatusCode(404)
                ->setJSON([
                    'status' => false,
                    'message' => 'ไม่พบข้อมูลผู้ใช้งาน'
                ]);
        }

        $data = $this->request->getJSON(true);

        // ตรวจสอบ Username ซ้ำ
        if (!empty($data['username'])) {

            $existingUser = $this->userModel
                ->where('username', $data['username'])
                ->where('user_id !=', $id)
                ->first();

            if ($existingUser) {
                return $this->response
                    ->setStatusCode(409)
                    ->setJSON([
                        'status' => false,
                        'message' => 'Username นี้มีอยู่แล้ว'
                    ]);
            }
        }

        // ตรวจสอบ Role
        if (!empty($data['role'])) {

            $allowedRoles = ['admin', 'staff', 'manager'];

            if (!in_array($data['role'], $allowedRoles)) {
                return $this->response
                    ->setStatusCode(400)
                    ->setJSON([
                        'status' => false,
                        'message' => 'Role ไม่ถูกต้อง'
                    ]);
            }
        }

        $userData = [];

        if (isset($data['username'])) {
            $userData['username'] = $data['username'];
        }

        if (isset($data['full_name'])) {
            $userData['full_name'] = $data['full_name'];
        }

        if (isset($data['role'])) {
            $userData['role'] = $data['role'];
        }

        if (isset($data['phone'])) {
            $userData['phone'] = $data['phone'];
        }

        if (isset($data['email'])) {
            $userData['email'] = $data['email'];
        }

        if (isset($data['status'])) {
            $userData['status'] = $data['status'];
        }

        // ถ้ามีการส่ง Password ใหม่ ให้ Hash ใหม่
        if (!empty($data['password'])) {
            $userData['password'] = password_hash(
                $data['password'],
                PASSWORD_DEFAULT
            );
        }

        if (!empty($userData)) {
            $this->userModel->update($id, $userData);
        }

        return $this->response->setJSON([
            'status' => true,
            'message' => 'แก้ไขข้อมูลผู้ใช้งานสำเร็จ'
        ]);
    }

    // DELETE /api/users/:id
    public function delete($id)
    {
        $user = $this->userModel->find($id);

        if (!$user) {
            return $this->response
                ->setStatusCode(404)
                ->setJSON([
                    'status' => false,
                    'message' => 'ไม่พบข้อมูลผู้ใช้งาน'
                ]);
        }

        $this->userModel->delete($id);

        return $this->response->setJSON([
            'status' => true,
            'message' => 'ลบผู้ใช้งานสำเร็จ'
        ]);
    }
}