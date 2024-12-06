<?php

namespace App\Models;

use CodeIgniter\Model;

class UserModel extends Model
{
    protected $table = 'users';
    protected $primaryKey = 'user_id';
    protected $allowedFields = [
        'first_name',
        'last_name', 
        'phone_number',
        'id_card',
        'email',
        'password', 
        'registration_date'
    ];

    // Method to fetch all users
    public function getUsers()
    {
        // Use the built-in query builder provided by CodeIgniter
        return $this->findAll(); // Returns all records as an array of objects
    } 
    public function getUser($email)
    {
        return $this->where('email', $email)->first();
    }
    public function getUsersByEmail()
    {
        // Use the built-in query builder provided by CodeIgniter
        return $this->select('email')->findAll();
        // Returns all records as an array of objects
    } 
}
