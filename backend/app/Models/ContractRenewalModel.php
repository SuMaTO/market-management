<?php

namespace App\Models;

use CodeIgniter\Model;

class ContractRenewalModel extends Model
{
    protected $table         = 'contract_renewals';
    protected $primaryKey    = 'renewal_id';
    protected $returnType    = 'array';
    protected $useTimestamps = false;

    protected $allowedFields = [
        'contract_id',
        'renewal_no',
        'start_date',
        'end_date',
        'deposit_amount',
        'status',
        'renewed_at',
        'renewed_by',
    ];
}