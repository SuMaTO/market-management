<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class CreateReceiptsTable extends Migration
{
    public function up()
    {
        $this->forge->addField([
            'receipt_id' => [
                'type'           => 'INT',
                'unsigned'       => true,
                'auto_increment' => true,
            ],
            'payment_id' => [
                'type'     => 'INT',
                'unsigned' => true,
            ],
            'receipt_no' => [
                'type'       => 'VARCHAR',
                'constraint' => 20,
            ],
            'receipt_date' => [
                'type'    => 'TIMESTAMP',
                'default' => new \CodeIgniter\Database\RawSql('CURRENT_TIMESTAMP'),
            ],
            'amount' => [
                'type'       => 'DECIMAL',
                'constraint' => '10,2',
            ],
            'issued_by' => [
                'type'     => 'INT',
                'unsigned' => true,
            ],
            'note' => [
                'type' => 'TEXT',
                'null' => true,
            ],
        ]);

        $this->forge->addKey('receipt_id', true);
        $this->forge->addUniqueKey('receipt_no');

        $this->forge->addForeignKey(
            'payment_id',
            'payments',
            'payment_id',
            'CASCADE',
            'RESTRICT'
        );

        $this->forge->addForeignKey(
            'issued_by',
            'users',
            'user_id',
            'RESTRICT',
            'RESTRICT'
        );

        $this->forge->createTable('receipts');
    }

    public function down()
    {
        $this->forge->dropTable('receipts');
    }
}
