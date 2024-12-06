<?php

namespace App\Models;

use CodeIgniter\Model;

class CarModel extends Model
{ 
    // protected $table = 'cars1';
    // protected $primaryKey = 'car_id';
    // protected $allowedFields = [
    //     'name', 
    //     'img_url', 
    // ];
    // protected $useTimestamps = false;


    protected $table = 'cars';
    protected $primaryKey = 'car_id';
    protected $allowedFields = [
        'car_name', 
        'car_image', 
        'brand', 
        'model', 
        'fuel_type', 
        'daily_rate', 
        'availability', 
    ];
    protected $useTimestamps = false;

    public function allCars()
    {
        // Use the built-in query builder provided by CodeIgniter
        return $this->findAll(); 
    }
    // unique car
    public function getOneCar($id)
    {
        return $this->where('car_id', $id)->first();
    }


 
}
