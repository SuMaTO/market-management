<?php

namespace App\Controllers\Api;

use App\Controllers\BaseController;
use App\Models\TenantModel;
use CodeIgniter\HTTP\ResponseInterface;

class Tenants extends BaseController
{
    protected $tenantModel;

    public function __construct()
    {
        $this->tenantModel = new TenantModel();
    }

    // GET /api/tenants
    public function index()
    {
        $tenants = $this->tenantModel
            ->orderBy('tenant_id', 'DESC')
            ->findAll();

        return $this->response->setJSON([
            'status' => true,
            'data'   => $tenants
        ]);
    }

    // GET /api/tenants/{id}
    public function show($id)
    {
        $tenant = $this->tenantModel->find($id);

        if (!$tenant) {
            return $this->response
                ->setStatusCode(404)
                ->setJSON([
                    'status'  => false,
                    'message' => 'ไม่พบข้อมูลผู้เช่า'
                ]);
        }

        return $this->response->setJSON([
            'status' => true,
            'data'   => $tenant
        ]);
    }

    // POST /api/tenants
    public function create()
    {
        $data = $this->request->getJSON(true);

        if (!$this->tenantModel->insert($data)) {
            return $this->response
                ->setStatusCode(400)
                ->setJSON([
                    'status'  => false,
                    'message' => 'ไม่สามารถเพิ่มข้อมูลผู้เช่าได้',
                    'errors'  => $this->tenantModel->errors()
                ]);
        }

        $tenantId = $this->tenantModel->getInsertID();

        return $this->response
            ->setStatusCode(201)
            ->setJSON([
                'status'  => true,
                'message' => 'เพิ่มข้อมูลผู้เช่าสำเร็จ',
                'data'    => $this->tenantModel->find($tenantId)
            ]);
    }

    // PUT /api/tenants/{id}
    public function update($id)
    {
        $tenant = $this->tenantModel->find($id);

        if (!$tenant) {
            return $this->response
                ->setStatusCode(404)
                ->setJSON([
                    'status'  => false,
                    'message' => 'ไม่พบข้อมูลผู้เช่า'
                ]);
        }

        $data = $this->request->getJSON(true);

        if (!$this->tenantModel->update($id, $data)) {
            return $this->response
                ->setStatusCode(400)
                ->setJSON([
                    'status'  => false,
                    'message' => 'ไม่สามารถแก้ไขข้อมูลผู้เช่าได้',
                    'errors'  => $this->tenantModel->errors()
                ]);
        }

        return $this->response->setJSON([
            'status'  => true,
            'message' => 'แก้ไขข้อมูลผู้เช่าสำเร็จ',
            'data'    => $this->tenantModel->find($id)
        ]);
    }

    // DELETE /api/tenants/{id}
    public function delete($id)
    {
        $tenant = $this->tenantModel->find($id);

        if (!$tenant) {
            return $this->response
                ->setStatusCode(404)
                ->setJSON([
                    'status'  => false,
                    'message' => 'ไม่พบข้อมูลผู้เช่า'
                ]);
        }

        if (!$this->tenantModel->delete($id)) {
            return $this->response
                ->setStatusCode(400)
                ->setJSON([
                    'status'  => false,
                    'message' => 'ไม่สามารถลบข้อมูลผู้เช่าได้'
                ]);
        }

        return $this->response->setJSON([
            'status'  => true,
            'message' => 'ลบข้อมูลผู้เช่าสำเร็จ'
        ]);
    }
}