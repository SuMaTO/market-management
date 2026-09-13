<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class CreateContractRenewalsTable extends Migration
{
    public function up()
    {
        $this->forge->addField([
            'renewal_id' => [
                'type'           => 'INT',
                'unsigned'       => true,
                'auto_increment' => true,
            ],
            'contract_id' => [
                'type'     => 'INT',
                'unsigned' => true,
            ],
            'renewal_no' => [
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
            'renewed_at' => [
                'type'    => 'TIMESTAMP',
                'default' => new \CodeIgniter\Database\RawSql('CURRENT_TIMESTAMP'),
            ],
            'renewed_by' => [
                'type'     => 'INT',
                'unsigned' => true,
            ],
        ]);

        $this->forge->addKey('renewal_id', true);
        $this->forge->addUniqueKey('renewal_no');

        $this->forge->addForeignKey(
            'contract_id',
            'contracts',
            'contract_id',
            'CASCADE',
            'RESTRICT'
        );

        $this->forge->addForeignKey(
            'renewed_by',
            'users',
            'user_id',
            'RESTRICT',
            'RESTRICT'
        );

        $this->forge->createTable('contract_renewals');
    }

    public function down()
    {
        $this->forge->dropTable('contract_renewals');
    }
}
