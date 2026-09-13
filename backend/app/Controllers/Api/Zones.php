<?php

namespace App\Controllers\Api;

use App\Controllers\BaseController;
use App\Models\ZoneModel;

class Zones extends BaseController
{
    protected $zoneModel;

    public function __construct()
    {
        $this->zoneModel = new ZoneModel();
    }

    // GET /api/zones
    public function index()
    {
        return $this->response->setJSON([
            'status' => true,
            'data'   => $this->zoneModel->findAll()
        ]);
    }

    // GET /api/zones/1
    public function show($id)
    {
        $zone = $this->zoneModel->find($id);

        if (!$zone) {
            return $this->response
                ->setStatusCode(404)
                ->setJSON([
                    'status'  => false,
                    'message' => 'ไม่พบข้อมูลโซน'
                ]);
        }

        return $this->response->setJSON([
            'status' => true,
            'data'   => $zone
        ]);
    }

    // POST /api/zones
    public function create()
    {
        $data = $this->request->getJSON(true);

        if (!$data) {
            return $this->response
                ->setStatusCode(400)
                ->setJSON([
                    'status'  => false,
                    'message' => 'ข้อมูลไม่ถูกต้อง'
                ]);
        }

        $this->zoneModel->insert($data);

        return $this->response
            ->setStatusCode(201)
            ->setJSON([
                'status'  => true,
                'message' => 'เพิ่มโซนสำเร็จ',
                'data'    => $data
            ]);
    }

    // PUT /api/zones/1
    public function update($id)
    {
        $zone = $this->zoneModel->find($id);

        if (!$zone) {
            return $this->response
                ->setStatusCode(404)
                ->setJSON([
                    'status'  => false,
                    'message' => 'ไม่พบข้อมูลโซน'
                ]);
        }

        $data = $this->request->getJSON(true);

        $this->zoneModel->update($id, $data);

        return $this->response->setJSON([
            'status'  => true,
            'message' => 'แก้ไขโซนสำเร็จ'
        ]);
    }

    // DELETE /api/zones/1
    public function delete($id)
    {
        $zone = $this->zoneModel->find($id);

        if (!$zone) {
            return $this->response
                ->setStatusCode(404)
                ->setJSON([
                    'status'  => false,
                    'message' => 'ไม่พบข้อมูลโซน'
                ]);
        }

        $this->zoneModel->delete($id);

        return $this->response->setJSON([
            'status'  => true,
            'message' => 'ลบโซนสำเร็จ'
        ]);
    }
}