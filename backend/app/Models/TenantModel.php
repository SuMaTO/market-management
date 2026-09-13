<?php

namespace App\Models;

use CodeIgniter\Model;

class TenantModel extends Model
{
    protected $table         = 'tenants';
    protected $primaryKey    = 'tenant_id';
    protected $returnType    = 'array';
    protected $useTimestamps = false;

    protected $allowedFields = [
        'id_card',
        'first_name',
        'last_name',
        'phone',
        'address',
        'registered_at',
    ];

    protected $validationRules = [
        'id_card' => 'required|exact_length[13]|numeric|is_unique[tenants.id_card,tenant_id,{tenant_id}]',
        'first_name' => 'required',
        'last_name'  => 'required',
    ];
}