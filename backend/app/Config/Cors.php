<?php

namespace Config;

use CodeIgniter\Config\BaseConfig;

class Cors extends BaseConfig
{
    /**
     * Default CORS configuration.
     */
    public array $default = [
        'allowedOrigins' => [
            'http://localhost:5173',
        ],

        'allowedOriginsPatterns' => [],

        'supportsCredentials' => false,

        'allowedHeaders' => [
            'Origin',
            'Content-Type',
            'Accept',
            'Authorization',
        ],

        'exposedHeaders' => [],

        'allowedMethods' => [
            'GET',
            'POST',
            'PUT',
            'DELETE',
            'OPTIONS',
        ],

        'maxAge' => 7200,
    ];
}