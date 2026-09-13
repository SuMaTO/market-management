<?php

namespace App\Models;

use CodeIgniter\Model;

class ReceiptModel extends Model
{
    protected $table         = 'receipts';
    protected $primaryKey    = 'receipt_id';
    protected $returnType    = 'array';
    protected $useTimestamps = false;

    protected $allowedFields = [
        'payment_id',
        'receipt_no',
        'receipt_date',
        'amount',
        'issued_by',
        'note',
    ];
}