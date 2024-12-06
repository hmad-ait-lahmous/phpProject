<?php
//defined('BASEPATH') OR exit('No direct script access allowed');
 


namespace App\Controllers;

use App\Controllers\BaseController;
use CodeIgniter\HTTP\ResponseInterface;
use \App\Models\DbModel;//darouryzidih


class  DbController extends BaseController {

    // public function __construct() {
    //     parent::__construct();
    //     // Load the database library
    //     $this->load->database();
    // }

    public function index() {
        // Test the connection to the database
        // if ($this->db->conn_id) {
        //     echo "Database connection successful!";
        // } else {
        //     echo "Failed to connect to the database.";
        // }

        $user = new \App\Models\DbModel();
        $userTest = $user->findAll();
        var_dump($userTest); 
    }
}
