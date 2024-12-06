<?php

namespace App\Controllers;

class ApiController extends BaseController
{
    // public function __construct() {
    //     //parent::__construct();
    //     cors_set_headers($this); // Call the CORS helper function
    // }

    //send data to front 
    // public function getData()
    // {
    //     $data = ['message' => 'Hello from CodeIgniter'];
    //     return $this->response->setJSON($data);
    // }
    public function receiveData()
{
    //$this->addCorsHeaders();
    
    try {
        $jsonData = $this->request->getJSON();
        error_log("Received JSON: ". json_encode($jsonData)); // Debugging
        if (!$jsonData) {
            return $this->response->setJSON(['error' => 'Invalid JSON'], 400);
        }
         
        return $this->response->setJSON(['message' => 'Data received', 'data' => $jsonData]);
    } catch (\Exception $e) {
        error_log("Error: " . $e->getMessage()); // Log errors
        return $this->response->setJSON(['error' => 'Server error'], 500);
    }
}

    // public function options()
    // {
    //     // Add CORS headers and return a success status for OPTIONS request
    //     $this->addCorsHeaders();
    //     return $this->response->setStatusCode(204); // No content for OPTIONS request
    // }

//     private function addCorsHeaders(){
//     // Set CORS headers for allowing requests from any origin
//     $this->response->setHeader('Access-Control-Allow-Origin', '*'); 
//     $this->response->setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, UPDATE, PATCH');
//     $this->response->setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//     $this->response->setHeader('Access-Control-Allow-Credentials', 'true');
// }

    
}
