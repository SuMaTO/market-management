<?php

namespace App\Models;

use CodeIgniter\Model;

class UtilityRateModel extends Model
{
    protected $table         = 'utility_rates';
    protected $primaryKey    = 'rate_id';
    protected $returnType    = 'array';
    protected $useTimestamps = false;

    protected $allowedFields = [
        'utility_type',
        'rate_per_unit',
        'effective_from',
        'effective_to',
        'status',
    ];
}