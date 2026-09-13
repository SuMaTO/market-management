<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class CreatePaymentsTable extends Migration
{
    public function up()
    {
        $this->forge->addField([
            'payment_id' => [
                'type'           => 'INT',
                'unsigned'       => true,
                'auto_increment' => true,
            ],
            'invoice_id' => [
                'type'     => 'INT',
                'unsigned' => true,
            ],
            'payment_date' => [
                'type' => 'TIMESTAMP',
                'null' => true,
            ],
            'amount' => [
                'type'       => 'DECIMAL',
                'constraint' => '10,2',
            ],
            'payment_method' => [
                'type'       => 'VARCHAR',
                'constraint' => 20,
            ],
            'slip_image' => [
                'type'       => 'VARCHAR',
                'constraint' => 255,
                'null'       => true,
            ],
            'transaction_ref' => [
                'type'       => 'VARCHAR',
                'constraint' => 100,
                'null'       => true,
            ],
            'status' => [
                'type'       => 'VARCHAR',
                'constraint' => 20,
                'default'    => 'รอตรวจสอบ',
            ],
            'verified_by' => [
                'type'     => 'INT',
                'unsigned' => true,
                'null'     => true,
            ],
            'verified_at' => [
                'type' => 'TIMESTAMP',
                'null' => true,
            ],
            'note' => [
                'type' => 'TEXT',
                'null' => true,
            ],
        ]);

        $this->forge->addKey('payment_id', true);

        $this->forge->addForeignKey(
            'invoice_id',
            'invoices',
            'invoice_id',
            'CASCADE',
            'RESTRICT'
        );

        $this->forge->addForeignKey(
            'verified_by',
            'users',
            'user_id',
            'SET NULL',
            'RESTRICT'
        );

        $this->forge->createTable('payments');
    }

    public function down()
    {
        $this->forge->dropTable('payments');
    }
}