<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class CreateStallsTable extends Migration
{
    public function up()
    {
        $this->forge->addField([
            'stall_id' => [
                'type'           => 'INT',
                'unsigned'       => true,
                'auto_increment' => true,
            ],
            'zone_id' => [
                'type'     => 'INT',
                'unsigned' => true,
            ],
            'stall_code' => [
                'type'       => 'VARCHAR',
                'constraint' => 20,
            ],
            'stall_name' => [
                'type'       => 'VARCHAR',
                'constraint' => 100,
                'null'       => true,
            ],
            'stall_size' => [
                'type'       => 'DECIMAL',
                'constraint' => '8,2',
            ],
            'rent_rate' => [
                'type'       => 'DECIMAL',
                'constraint' => '10,2',
            ],
            'status' => [
                'type'       => 'VARCHAR',
                'constraint' => 20,
                'default'    => 'ว่าง',
            ],
            'description' => [
                'type' => 'TEXT',
                'null' => true,
            ],
        ]);

        $this->forge->addKey('stall_id', true);
        $this->forge->addUniqueKey('stall_code');

        $this->forge->addForeignKey(
            'zone_id',
            'zones',
            'zone_id',
            'CASCADE',
            'RESTRICT'
        );

        $this->forge->createTable('stalls');
    }

    public function down()
    {
        $this->forge->dropTable('stalls');
    }
}