<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class AlignStallsColumns extends Migration
{
    public function up()
    {
        $fields = $this->db->getFieldNames('stalls');

        if (in_array('monthly_rent', $fields, true) && !in_array('rent_rate', $fields, true)) {
            $this->db->query('ALTER TABLE stalls RENAME COLUMN monthly_rent TO rent_rate');
        }

        if (in_array('note', $fields, true) && !in_array('description', $fields, true)) {
            $this->db->query('ALTER TABLE stalls RENAME COLUMN note TO description');
        }

        $fields = $this->db->getFieldNames('stalls');

        if (!in_array('stall_name', $fields, true)) {
            $this->forge->addColumn('stalls', [
                'stall_name' => [
                    'type'       => 'VARCHAR',
                    'constraint' => 100,
                    'null'       => true,
                ],
            ]);
        }
    }

    public function down()
    {
        $fields = $this->db->getFieldNames('stalls');

        if (in_array('stall_name', $fields, true)) {
            $this->forge->dropColumn('stalls', 'stall_name');
        }

        if (in_array('rent_rate', $fields, true) && !in_array('monthly_rent', $fields, true)) {
            $this->db->query('ALTER TABLE stalls RENAME COLUMN rent_rate TO monthly_rent');
        }

        if (in_array('description', $fields, true) && !in_array('note', $fields, true)) {
            $this->db->query('ALTER TABLE stalls RENAME COLUMN description TO note');
        }
    }
}
