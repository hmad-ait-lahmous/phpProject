<?php

namespace App\Models;

use CodeIgniter\Model;

class BookingModel extends Model
{
    protected $table = 'bookings';
    protected $primaryKey = 'booking_id';
    protected $allowedFields = [
        'user_id', 
        'car_id', 
        'start_date', 
        'end_date', 
        'status', 
        'creation_date'
    ];
    protected $useTimestamps = false;
}
