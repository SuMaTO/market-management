<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class CreateUtilityRatesTable extends Migration
{
    public function up()
    {
        $this->forge->addField([
            'rate_id' => [
                'type'           => 'INT',
                'unsigned'       => true,
                'auto_increment' => true,
            ],
            'utility_type' => [
                'type'       => 'VARCHAR',
                'constraint' => 20,
            ],
            'rate_per_unit' => [
                'type'       => 'DECIMAL',
                'constraint' => '10,2',
            ],
            'effective_from' => [
                'type' => 'DATE',
            ],
            'effective_to' => [
                'type' => 'DATE',
                'null' => true,
            ],
            'status' => [
                'type'       => 'VARCHAR',
                'constraint' => 20,
                'default'    => 'ใช้งาน',
            ],
        ]);

        $this->forge->addKey('rate_id', true);
        $this->forge->addUniqueKey('utility_type');

        $this->forge->createTable('utility_rates');
    }

    public function down()
    {
        $this->forge->dropTable('utility_rates');
    }
}
