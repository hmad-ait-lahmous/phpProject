<?php
namespace App\Controllers;

use App\Models\UserModel;
use CodeIgniter\RESTful\ResourceController;

class UserController extends ResourceController {
    
    public function index()
    { 
        $userModel = new UserModel();
    
        // Fetch all users
        $users = $userModel->getUsers();
    
        // Return the users as JSON response
        return $this->response->setJSON([
            'status' => 'success',
            'data' => $users
        ]);
    }
    

    public function signUp()
    {
        try { 
            // Retrieve JSON data from the request
            $jsonData = $this->request->getJSON();
            error_log('the received data is :'.print_r($jsonData,true));
            // Extract individual fields from JSON
            $first_name = $jsonData->first_name ?? null;
            $last_name = $jsonData->last_name ?? null;
            $phone_number = $jsonData->phone_number ?? null;
            $id_card = $jsonData->id_card ?? null;
            $email = $jsonData->email ?? null;
            $password = $jsonData->password ?? null;
            $hashedPassword = hash('sha256', $password);

            // error_log("first name : " . $first_name);
            // error_log("last name : " . $last_name);
            // error_log("phone number : " . $phone_number);
            // error_log("cin : " . $id_card);
            // error_log("email : " . $email);
            // error_log("password : " . $hashedPassword);

            $email = strtolower($email);
            // Save data to the database
            $userModel = new UserModel();
            // error_log('the user model is :'.print_r($userModel,true));
            
            $isSaved = $userModel->save([
                'first_name' => $first_name,
                'last_name' => $last_name,
                'phone_number' => $phone_number,
                'id_card' => $id_card,
                'email' => $email,
                'password' => $hashedPassword,
                'registration_date' => date('Y-m-d H:i:s')
            ]);
    
            // // Return appropriate response
            if ($isSaved) {
                error_log('the user is saved');
                return $this->response->setJSON([
                    'status' => 'success',
                    'message' => 'User created successfully'
                ]);
            } else {
                return $this->response->setJSON([
                    'status'  => 'warning',
                    'message' => 'User received but not saved'
                ]);
            }
        } catch (\Exception $e) {
            // Log errors and return error response
            error_log("Error: " . $e->getMessage());
            return $this->response->setJSON(['error' => 'Server error'], 500);
        }
    }
    
    public function login()
    {
        try {
            // Retrieve JSON data from the request
            $jsonData = $this->request->getJSON();
    
            // Extract email and password from the JSON data
            $email = $jsonData->email ?? null;
            $password = $jsonData->password ?? null;

            error_log("email : " . $email);
            error_log("password : " . $password);

            if (!$email || !$password) {
                return $this->response->setJSON([
                    'status' => 'error',
                    'message' => 'Email and password are required.'
                ], 400);
            }
            // if ($password) {
            //     return $this->response->setJSON([
            //         'status' => 'error',
            //         'message' => 'Email and password are required.'
            //     ], 400);
            // }
    
            // Hash the input password using SHA-256
            $hashedPassword = hash('sha256', $password);

          
            // Load the user model
            $userModel = new UserModel();
            // error_log('the user model is :'.print_r($userModel,true));
    
            // Query the user by email
            $user = $userModel->getUser($email);
            // error_log('the user  is => :'.print_r($user,true));
            if ($user) {
               error_log('the user found ');
                // Verify the hashed password
                if ($user['password'] === $hashedPassword) {
                    error_log("the password are correct . ");
                    // Generate a response (e.g., token or success message)
                    $res=$this->response->setJSON([
                        'status' => 'success',
                        'message' => 'Login successful.',
                        'user' => [
                            'user_id' => $user['user_id'],
                            'first_name' => $user['first_name'],
                            'last_name' => $user['last_name'],
                            'email' => $user['email'],
                        ]
                    ]);
                    // error_log('the user model is :'.print_r($res,true));
                    return $res;
                } else {
                    error_log('password are not correct');
                    return $this->response->setJSON([
                        'status' => 'error',
                        'message' => 'Invalid email or password.',
                        'user' => [
                            'user_id' => null,
                            'first_name' =>null,
                            'last_name' =>null,
                            'email' =>null,
                        ]
                    ], 401);
                }
            } else {
                
                return $this->response->setJSON([
                    'status' => 'error',
                    'message' => 'User not found.'
                ], 404);
            }
        } catch (\Exception $e) {
            // Log the error and return a server error response
            error_log("Error: " . $e->getMessage());
            return $this->response->setJSON(['error' => 'Server error'], 500);
        }
    }
    
}




?>