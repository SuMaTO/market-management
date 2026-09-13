<?php

namespace App\Controllers\Api;

use CodeIgniter\RESTful\ResourceController;
use App\Models\StallModel;

class Stalls extends ResourceController
{
    protected $format = 'json';

    protected $stallModel;

    public function __construct()
    {
        $this->stallModel = new StallModel();
    }

    // GET /api/stalls
    public function index()
    {
        $data = $this->stallModel
            ->select('stalls.*, zones.zone_name')
            ->join('zones', 'zones.zone_id = stalls.zone_id', 'left')
            ->orderBy('stalls.stall_id', 'ASC')
            ->findAll();

        return $this->respond([
            'status' => true,
            'data' => $data
        ]);
    }

    // GET /api/stalls/{id}
    public function show($id = null)
    {
        $data = $this->stallModel
            ->select('stalls.*, zones.zone_name')
            ->join('zones', 'zones.zone_id = stalls.zone_id', 'left')
            ->where('stalls.stall_id', $id)
            ->first();

        if (!$data) {
            return $this->failNotFound('ไม่พบข้อมูลแผงค้า');
        }

        return $this->respond([
            'status' => true,
            'data' => $data
        ]);
    }

    // POST /api/stalls
    public function create()
    {
        $data = $this->normalizeStallPayload($this->request->getJSON(true) ?? []);

        if (empty($data['zone_id'])) {
            return $this->failValidationErrors('กรุณาระบุโซน');
        }

        if (empty($data['stall_code'])) {
            return $this->failValidationErrors('กรุณาระบุรหัสแผงค้า');
        }

        if (empty($data['status'])) {
            $data['status'] = 'vacant';
        }

        $id = $this->stallModel->insert($data);

        if (!$id) {
            return $this->fail($this->stallModel->errors());
        }

        return $this->respondCreated([
            'status' => true,
            'message' => 'เพิ่มแผงค้าสำเร็จ',
            'data' => $this->stallModel->find($id)
        ]);
    }

    // PUT /api/stalls/{id}
    public function update($id = null)
    {
        $stall = $this->stallModel->find($id);

        if (!$stall) {
            return $this->failNotFound('ไม่พบข้อมูลแผงค้า');
        }

        $data = $this->normalizeStallPayload($this->request->getJSON(true) ?? []);

        if (!$this->stallModel->update($id, $data)) {
            return $this->fail($this->stallModel->errors());
        }

        return $this->respond([
            'status' => true,
            'message' => 'แก้ไขแผงค้าสำเร็จ',
            'data' => $this->stallModel->find($id)
        ]);
    }

    // DELETE /api/stalls/{id}
    public function delete($id = null)
    {
        $stall = $this->stallModel->find($id);

        if (!$stall) {
            return $this->failNotFound('ไม่พบข้อมูลแผงค้า');
        }

        $this->stallModel->delete($id);

        return $this->respondDeleted([
            'status' => true,
            'message' => 'ลบแผงค้าสำเร็จ'
        ]);
    }

    private function normalizeStallPayload(array $data): array
    {
        $allowed = [
            'zone_id',
            'stall_code',
            'stall_name',
            'stall_size',
            'rent_rate',
            'status',
            'description',
        ];

        $payload = [];

        foreach ($allowed as $field) {
            if (!array_key_exists($field, $data)) {
                continue;
            }

            $value = $data[$field];

            if (is_string($value)) {
                $value = trim($value);
            }

            if ($value === '') {
                $payload[$field] = in_array($field, ['stall_name', 'description'], true) ? null : $value;
                continue;
            }

            $payload[$field] = $value;
        }

        return $payload;
    }
}
