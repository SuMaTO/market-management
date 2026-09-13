<?php

namespace App\Models;

use CodeIgniter\Model;

class UtilityReadingModel extends Model
{
    protected $table         = 'utility_readings';
    protected $primaryKey    = 'reading_id';
    protected $returnType    = 'array';
    protected $useTimestamps = false;

    protected $allowedFields = [
        'contract_id',
        'utility_type',
        'meter_no',
        'reading_date',
        'previous_reading',
        'current_reading',
        'unit_used',
        'created_by',
        'created_at',
    ];
}