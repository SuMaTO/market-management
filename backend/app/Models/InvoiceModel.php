<?php

namespace App\Models;

use CodeIgniter\Model;

class InvoiceModel extends Model
{
    protected $table         = 'invoices';
    protected $primaryKey    = 'invoice_id';
    protected $returnType    = 'array';
    protected $useTimestamps = false;

    protected $allowedFields = [
        'contract_id',
        'invoice_no',
        'invoice_date',
        'period_start',
        'period_end',
        'rent_amount',
        'water_amount',
        'electricity_amount',
        'penalty_amount',
        'total_amount',
        'status',
        'created_by',
        'created_at',
    ];
}