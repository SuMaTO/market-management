<?php

namespace App\Models;

use CodeIgniter\Model;

class PaymentModel extends Model
{
    protected $table         = 'payments';
    protected $primaryKey    = 'payment_id';
    protected $returnType    = 'array';
    protected $useTimestamps = false;

    protected $allowedFields = [
        'invoice_id',
        'payment_date',
        'amount',
        'payment_method',
        'slip_image',
        'transaction_ref',
        'status',
        'verified_by',
        'verified_at',
        'note',
    ];
}