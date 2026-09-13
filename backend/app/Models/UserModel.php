<?php

namespace App\Models;

use CodeIgniter\Model;

class UserModel extends Model
{
    protected $table            = 'users';
    protected $primaryKey       = 'user_id';
    protected $returnType       = 'array';
    protected $useTimestamps    = false;

    protected $allowedFields = [
        'username',
        'password',
        'full_name',
        'role',
        'phone',
        'email',
        'status',
    ];
}
