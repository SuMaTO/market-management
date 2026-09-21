<?php

namespace App\Models;

use CodeIgniter\Model;

class ContractModel extends Model
{
    protected $table         = 'contracts';
    protected $primaryKey    = 'contract_id';
    protected $returnType    = 'array';

    protected $allowedFields = [
        'tenant_id',
        'stall_id',
        'contract_no',
        'start_date',
        'end_date',
        'deposit_amount',
        'status',
        'created_by',
        'created_at',
    ];
    protected $useTimestamps = false;
}