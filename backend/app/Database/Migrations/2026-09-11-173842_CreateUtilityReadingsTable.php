<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class CreateUtilityReadingsTable extends Migration
{
    public function up()
    {
        $this->forge->addField([
            'reading_id' => [
                'type'           => 'INT',
                'unsigned'       => true,
                'auto_increment' => true,
            ],
            'contract_id' => [
                'type'     => 'INT',
                'unsigned' => true,
            ],
            'utility_type' => [
                'type'       => 'VARCHAR',
                'constraint' => 20,
            ],
            'meter_no' => [
                'type'       => 'VARCHAR',
                'constraint' => 50,
            ],
            'reading_date' => [
                'type' => 'DATE',
            ],
            'previous_reading' => [
                'type'       => 'DECIMAL',
                'constraint' => '10,2',
            ],
            'current_reading' => [
                'type'       => 'DECIMAL',
                'constraint' => '10,2',
            ],
            'unit_used' => [
                'type'       => 'DECIMAL',
                'constraint' => '10,2',
            ],
            'created_by' => [
                'type'     => 'INT',
                'unsigned' => true,
            ],
            'created_at' => [
                'type'    => 'TIMESTAMP',
                'default' => new \CodeIgniter\Database\RawSql('CURRENT_TIMESTAMP'),
            ],
        ]);

        $this->forge->addKey('reading_id', true);

        $this->forge->addForeignKey(
            'contract_id',
            'contracts',
            'contract_id',
            'CASCADE',
            'RESTRICT'
        );

        $this->forge->addForeignKey(
            'created_by',
            'users',
            'user_id',
            'RESTRICT',
            'RESTRICT'
        );

        $this->forge->createTable('utility_readings');
    }

    public function down()
    {
        $this->forge->dropTable('utility_readings');
    }
}