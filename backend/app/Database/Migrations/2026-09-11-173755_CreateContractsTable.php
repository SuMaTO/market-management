<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class CreateContractsTable extends Migration
{
    public function up()
    {
        $this->forge->addField([
            'contract_id' => [
                'type'           => 'INT',
                'unsigned'       => true,
                'auto_increment' => true,
            ],
            'tenant_id' => [
                'type'     => 'INT',
                'unsigned' => true,
            ],
            'stall_id' => [
                'type'     => 'INT',
                'unsigned' => true,
            ],
            'contract_no' => [
                'type'       => 'VARCHAR',
                'constraint' => 20,
            ],
            'start_date' => [
                'type' => 'DATE',
            ],
            'end_date' => [
                'type' => 'DATE',
            ],
            'deposit_amount' => [
                'type'       => 'DECIMAL',
                'constraint' => '10,2',
                'default'    => 0,
            ],
            'status' => [
                'type'       => 'VARCHAR',
                'constraint' => 20,
                'default'    => 'ใช้งาน',
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

        $this->forge->addKey('contract_id', true);
        $this->forge->addUniqueKey('contract_no');

        $this->forge->addForeignKey(
            'tenant_id',
            'tenants',
            'tenant_id',
            'CASCADE',
            'RESTRICT'
        );

        $this->forge->addForeignKey(
            'stall_id',
            'stalls',
            'stall_id',
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

        $this->forge->createTable('contracts');
    }

    public function down()
    {
        $this->forge->dropTable('contracts');
    }
}
