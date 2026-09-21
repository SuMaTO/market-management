<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class CreateUserTokensTable extends Migration
{
    public function up()
    {
        $this->forge->addField([
            'token_id' => [
                'type'           => 'INT',
                'constraint'     => 11,
                'unsigned'       => true,
                'auto_increment' => true,
            ],

            'user_id' => [
                'type'       => 'INT',
                'constraint' => 11,
                'unsigned'   => true,
            ],

            'token' => [
                'type'       => 'VARCHAR',
                'constraint' => 255,
            ],

            'expires_at' => [
                'type' => 'TIMESTAMP',
                'null' => true,
            ],

            'created_at' => [
                'type' => 'TIMESTAMP',
                'null' => false,
            ],
        ]);

        $this->forge->addKey('token_id', true);

        // User 1 คน สามารถมีหลาย Token ได้
        $this->forge->addForeignKey(
            'user_id',
            'users',
            'user_id',
            'CASCADE',
            'CASCADE'
        );

        $this->forge->createTable('user_tokens');
    }

    public function down()
    {
        $this->forge->dropTable('user_tokens');
    }
}
