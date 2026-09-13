<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class CreateZonesTable extends Migration
{
    public function up()
    {
        $this->forge->addField([
            'zone_id' => [
                'type'           => 'INT',
                'unsigned'       => true,
                'auto_increment' => true,
            ],
            'zone_name' => [
                'type'       => 'VARCHAR',
                'constraint' => 100,
            ],
            'description' => [
                'type' => 'TEXT',
                'null' => true,
            ],
        ]);

        $this->forge->addKey('zone_id', true);
        $this->forge->createTable('zones');
    }

    public function down()
    {
        $this->forge->dropTable('zones');
    }
}
