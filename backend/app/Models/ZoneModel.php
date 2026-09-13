<?php

namespace App\Models;

use CodeIgniter\Model;

class ZoneModel extends Model
{
    protected $table         = 'zones';
    protected $primaryKey    = 'zone_id';
    protected $returnType    = 'array';
    # protected $useTimestamps = false;

    protected $allowedFields = [
        'zone_name',
        'description',
    ];
}