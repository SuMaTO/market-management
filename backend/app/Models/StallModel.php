<?php

namespace App\Models;

use CodeIgniter\Model;

class StallModel extends Model
{
    protected $table         = 'stalls';
    protected $primaryKey    = 'stall_id';
    protected $returnType    = 'array';
    protected $useTimestamps = false;

    protected $allowedFields = [
        'zone_id',
        'stall_code',
        'stall_name',
        'stall_size',
        'rent_rate',
        'status',
        'description',
    ];
}