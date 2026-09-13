<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class CreateInvoicesTable extends Migration
{
    public function up()
    {
        $this->forge->addField([
            'invoice_id' => [
                'type'           => 'INT',
                'unsigned'       => true,
                'auto_increment' => true,
            ],
            'contract_id' => [
                'type'     => 'INT',
                'unsigned' => true,
            ],
            'invoice_no' => [
                'type'       => 'VARCHAR',
                'constraint' => 20,
            ],
            'invoice_date' => [
                'type' => 'DATE',
            ],
            'period_start' => [
                'type' => 'DATE',
            ],
            'period_end' => [
                'type' => 'DATE',
            ],
            'rent_amount' => [
                'type'       => 'DECIMAL',
                'constraint' => '10,2',
                'default'    => 0,
            ],
            'water_amount' => [
                'type'       => 'DECIMAL',
                'constraint' => '10,2',
                'default'    => 0,
            ],
            'electricity_amount' => [
                'type'       => 'DECIMAL',
                'constraint' => '10,2',
                'default'    => 0,
            ],
            'penalty_amount' => [
                'type'       => 'DECIMAL',
                'constraint' => '10,2',
                'default'    => 0,
            ],
            'total_amount' => [
                'type'       => 'DECIMAL',
                'constraint' => '10,2',
                'default'    => 0,
            ],
            'status' => [
                'type'       => 'VARCHAR',
                'constraint' => 20,
                'default'    => 'รอดำเนินการ',
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

        $this->forge->addKey('invoice_id', true);
        $this->forge->addUniqueKey('invoice_no');

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

        $this->forge->createTable('invoices');
    }

    public function down()
    {
        $this->forge->dropTable('invoices');
    }
}