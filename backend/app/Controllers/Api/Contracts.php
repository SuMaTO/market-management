<?php

namespace App\Controllers\Api;

use App\Controllers\BaseController;
use App\Models\ContractModel;

class Contracts extends BaseController
{
    protected $contractModel;

    public function __construct()
    {
        $this->contractModel = new ContractModel();
    }

    // GET /api/contracts
    public function index()
    {
        $contracts = $this->contractModel
            ->orderBy('contract_id', 'DESC')
            ->findAll();

        return $this->response->setJSON([
            'status' => true,
            'data'   => $contracts
        ]);
    }

    // GET /api/contracts/{id}
    public function show($id)
    {
        $contract = $this->contractModel->find($id);

        if (!$contract) {
            return $this->response
                ->setStatusCode(404)
                ->setJSON([
                    'status'  => false,
                    'message' => 'ไม่พบข้อมูลสัญญาเช่า'
                ]);
        }

        return $this->response->setJSON([
            'status' => true,
            'data'   => $contract
        ]);
    }

    // POST /api/contracts
    public function create()
    {
        $data = $this->request->getJSON(true);
    
        if (!$data) {
            return $this->response
                ->setStatusCode(400)
                ->setJSON([
                    'status' => false,
                    'message' => 'ข้อมูลที่ส่งมาไม่ถูกต้อง'
                ]);
        }
    
        // สร้างเลขที่สัญญาอัตโนมัติ
        $year = date('Y');
    
        $lastContract = $this->contractModel
            ->like('contract_no', "CT-{$year}-", 'after')
            ->orderBy('contract_id', 'DESC')
            ->first();
    
        if ($lastContract) {
            $lastNumber = (int) substr($lastContract['contract_no'], -3);
            $nextNumber = $lastNumber + 1;
        } else {
            $nextNumber = 1;
        }
    
        $data['contract_no'] = sprintf(
            'CT-%s-%03d',
            $year,
            $nextNumber
        );
    
        // created_by มาจาก User ที่ Login
        if (isset($this->request->userId)) {
            $data['created_by'] = $this->request->userId;
        }
    
        // ไม่รับ contract_no จาก React
        // และไม่ให้ผู้ใช้กำหนด created_by เอง
    
        if (!$this->contractModel->insert($data)) {
            return $this->response
                ->setStatusCode(400)
                ->setJSON([
                    'status' => false,
                    'message' => 'ไม่สามารถเพิ่มสัญญาเช่าได้',
                    'errors' => $this->contractModel->errors()
                ]);
        }
    
        $contractId = $this->contractModel->getInsertID();
    
        return $this->response
            ->setStatusCode(201)
            ->setJSON([
                'status' => true,
                'message' => 'เพิ่มสัญญาเช่าสำเร็จ',
                'data' => $this->contractModel->find($contractId)
            ]);
    }

    // PUT /api/contracts/{id}
    public function update($id)
    {
        $contract = $this->contractModel->find($id);

        if (!$contract) {
            return $this->response
                ->setStatusCode(404)
                ->setJSON([
                    'status'  => false,
                    'message' => 'ไม่พบข้อมูลสัญญาเช่า'
                ]);
        }

        $data = $this->request->getJSON(true);

        if (!$data) {
            return $this->response
                ->setStatusCode(400)
                ->setJSON([
                    'status'  => false,
                    'message' => 'ข้อมูลที่ส่งมาไม่ถูกต้อง'
                ]);
        }

        if (!$this->contractModel->update($id, $data)) {
            return $this->response
                ->setStatusCode(400)
                ->setJSON([
                    'status'  => false,
                    'message' => 'ไม่สามารถแก้ไขสัญญาเช่าได้',
                    'errors'  => $this->contractModel->errors()
                ]);
        }

        return $this->response->setJSON([
            'status'  => true,
            'message' => 'แก้ไขสัญญาเช่าสำเร็จ',
            'data'    => $this->contractModel->find($id)
        ]);
    }

    // DELETE /api/contracts/{id}
    public function delete($id)
    {
        $contract = $this->contractModel->find($id);

        if (!$contract) {
            return $this->response
                ->setStatusCode(404)
                ->setJSON([
                    'status'  => false,
                    'message' => 'ไม่พบข้อมูลสัญญาเช่า'
                ]);
        }

        if (!$this->contractModel->delete($id)) {
            return $this->response
                ->setStatusCode(400)
                ->setJSON([
                    'status'  => false,
                    'message' => 'ไม่สามารถลบสัญญาเช่าได้'
                ]);
        }

        return $this->response->setJSON([
            'status'  => true,
            'message' => 'ลบสัญญาเช่าสำเร็จ'
        ]);
    }
}