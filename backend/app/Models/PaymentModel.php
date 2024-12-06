<?php

namespace App\Models;

use CodeIgniter\Model;

class PaymentModel extends Model
{
    protected $table = 'payments';
    protected $primaryKey = 'payment_id';
    protected $allowedFields = [
        'booking_id', 
        'amount', 
        'payment_date', 
        'status'
    ];
    protected $useTimestamps = false;
}
