<?php

namespace App\Models;

use CodeIgniter\Model;

class UserTokenModel extends Model
{
    protected $table = 'user_tokens';

    protected $primaryKey = 'token_id';

    protected $returnType = 'array';

    protected $allowedFields = [
        'user_id',
        'token',
        'expires_at',
        'created_at',
    ];
}