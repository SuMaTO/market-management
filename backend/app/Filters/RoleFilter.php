<?php

namespace App\Filters;

use CodeIgniter\HTTP\RequestInterface;
use CodeIgniter\HTTP\ResponseInterface;
use CodeIgniter\Filters\FilterInterface;

class RoleFilter implements FilterInterface
{
    public function before(
        RequestInterface $request,
        $arguments = null
    ) {
        $userRole = $request->userRole ?? null;

        if (!$userRole) {
            return service('response')
                ->setStatusCode(401)
                ->setJSON([
                    'status' => false,
                    'message' => 'ไม่พบข้อมูลสิทธิ์ผู้ใช้งาน'
                ]);
        }

        // Role ที่อนุญาตจาก Route
        $allowedRoles = $arguments ?? [];

        if (!in_array($userRole, $allowedRoles)) {
            return service('response')
                ->setStatusCode(403)
                ->setJSON([
                    'status' => false,
                    'message' => 'คุณไม่มีสิทธิ์ดำเนินการนี้'
                ]);
        }
    }

    public function after(
        RequestInterface $request,
        ResponseInterface $response,
        $arguments = null
    ) {
    }
}