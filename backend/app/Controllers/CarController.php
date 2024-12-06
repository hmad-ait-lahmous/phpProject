<?php

namespace App\Controllers;

use App\Models\CarModel;
use App\Models\UserModel;
use App\Libraries\UploadHandler;
use CodeIgniter\HTTP\ResponseInterface;

class CarController extends BaseController
{
    // public function addCar()
    // {
    //     $carModel = new CarModel();
    //     $uploadHandler = new UploadHandler();

    //     // Récupérer les données de la requête POST
    //     $name = $this->request->getPost('name');
    //     $file = $this->request->getFile('car_image');
    //     $brand = $this->request->getPost('brand');
    //     $model = $this->request->getPost('model'); 
    //     $fuel_type = $this->request->getPost('fuel_type'); 
    //     $daily_rate = $this->request->getPost('daily_rate'); 
    //     $availability = $this->request->getPost('availability'); 
         
        
    //     error_log( ' the name is : '.$name);
    //     error_log( ' the file is : '.$file);
    //     error_log( ' the brand is : '.$brand);
    //     error_log( ' the model is : '.$model);
    //     error_log( ' the fuel_type is : '.$fuel_type);
    //     error_log( ' the daily rate  is : '.$daily_rate);
    //     error_log( ' the availibility is : '.$availability);
        
    //     // Validation des données
    //     if (empty($name) || !$file || !$file->isValid()) {
    //         return $this->response->setJSON([ 
    //             'status' => 'error',
    //             'message' => 'Données invalides ou fichier manquant',
    //         ])->setStatusCode(ResponseInterface::HTTP_BAD_REQUEST);
    //     }

    //     try {
    //         // Upload du fichier et obtention du nouveau nom
    //         $newImageName = $uploadHandler->uploadFile($file);

    //         // Construire l'URL de l'image pour la base de données
    //         $imgUrl = base_url('uploads/' . $newImageName);
    //             error_log('the image url is :  '.$imgUrl);
    //         // Insérer les données dans la base
    //         $data=[
    //         'car_name' => $name,
    //         'car_image' => $imgUrl,
    //         'brand' => $brand, 
    //         'model' => $model, 
    //         'fuel_type' => $fuel_type, 
    //         'daily_rate' => $daily_rate, 
    //         'availability' => $availability, 
    //         ];
    //       $isSaved=  $carModel->insert($data);
    //             if (!$isSaved){
    //                 $this->envoyerEmails($data);

    //                 return $this->response->setJSON([
    //                     'status' => 'success',
    //                     'message' => 'Voiture ajoutée avec succès',
    //                 ])->setStatusCode(ResponseInterface::HTTP_CREATED);
    //             }
    //             if (!$isSaved) {
    //                 error_log('Insert failed: ' . json_encode($carModel->errors()));
    //             }
    //         // Retourner une réponse de succès
        
    //     } catch (\RuntimeException $e) {
    //         // Gérer les erreurs d'upload
    //         return $this->response->setJSON([
    //             'status' => 'error',
    //             'message' => $e->getMessage(),
    //         ])->setStatusCode(ResponseInterface::HTTP_INTERNAL_SERVER_ERROR);
    //     }
       
    // }

    public function addCar()
{
    $carModel = new CarModel();
    $uploadHandler = new UploadHandler();

    // Collect POST data
    $name = $this->request->getPost('name');
    $file = $this->request->getFile('car_image');
    $brand = $this->request->getPost('brand');
    $model = $this->request->getPost('model');
    $fuel_type = $this->request->getPost('fuel_type');
    $daily_rate = $this->request->getPost('daily_rate');
    $availability = $this->request->getPost('availability');

    // Validate inputs
    if (empty($name) || !$file || !$file->isValid()) {
        return $this->response->setJSON([
            'status' => 'error',
            'message' => 'Invalid data or missing file',
        ])->setStatusCode(ResponseInterface::HTTP_BAD_REQUEST);
    }

    try {
        // Upload file
        $newImageName = $uploadHandler->uploadFile($file);
        $imgUrl = base_url('uploads/' . $newImageName);

        // Save car data
        $data = [
            'car_name' => $name,
            'car_image' => $imgUrl,
            'brand' => $brand,
            'model' => $model,
            'fuel_type' => $fuel_type,
            'daily_rate' => $daily_rate,
            'availability' => $availability,
        ];
        $isSaved = $carModel->insert($data);

        if ($isSaved) {
            // Send notification emails
            $this->envoyerEmails($data);

            return $this->response->setJSON([
                'status' => 'success',
                'message' => 'Car added successfully!',
            ])->setStatusCode(ResponseInterface::HTTP_CREATED);
        } else {
            error_log('Insert failed: ' . json_encode($carModel->errors()));
            return $this->response->setJSON([
                'status' => 'error',
                'message' => 'Failed to save car data',
            ])->setStatusCode(ResponseInterface::HTTP_INTERNAL_SERVER_ERROR);
        }
    } catch (\RuntimeException $e) {
        return $this->response->setJSON([
            'status' => 'error',
            'message' => $e->getMessage(),
        ])->setStatusCode(ResponseInterface::HTTP_INTERNAL_SERVER_ERROR);
    }
}

//  ================== 

private function envoyerEmails($car)
{
    $userModel = new UserModel();
    $users = $userModel->getUsersByEmail(); // Fetch all user emails

    $email = \Config\Services::email();

    foreach ($users as $user) {
        $email->clear();
        $email->setTo($user['email']);
        $email->setSubject('Discover Our New Car: ' . $car['car_name']);

        // Professional HTML email content
        $message = "
            <h1>New Car Added to Our Fleet!</h1>
            <p>We are excited to introduce our latest addition: <strong>{$car['car_name']}</strong>.</p>
            <p>Brand: {$car['brand']}</p>
            <p>Model: {$car['model']}</p>
            <p>Fuel Type: {$car['fuel_type']}</p>
            <p>Daily Rate: {$car['daily_rate']}</p>
            <p>Check it out now on our platform!</p>
        ";

        $email->setMessage($message);
        $email->setMailType('html'); // HTML email

        if (!$email->send()) {
            error_log('Failed to send email to: ' . $user['email']);
        }
    }
}


    ///////======================
    public function getCars()
    {
        $carModel = new CarModel();

        // Récupérer toutes les voitures
        $cars = $carModel->allCars();
        

        // Retourner les données sous forme JSON
        return $this->response->setJSON([
            'status' => 'success',
            'data' => $cars,
        ]);
    }

    public function getCar(){
        $carModel= new CarModel();
            $car_id= $this->request->getPost('car_id');

        $car = $carModel->getOneCar($car_id);

        return $this->response->setJSON([
            'status' => 'success',
            'data' => $car,
        ]);
    }
    
    
    //delete car logic 
    public function deleteCar($car_id = null)
{
    // Check if car_id is provided
    if ($car_id === null) {
        return $this->response->setJSON([
            'status' => 'error',
            'message' => 'Car ID is required',
        ])->setStatusCode(ResponseInterface::HTTP_BAD_REQUEST);
    }

    $carModel = new CarModel();

    // Attempt to find the car in the database
    $car = $carModel->find($car_id);

    if (!$car) {
        return $this->response->setJSON([
            'status' => 'error',
            'message' => 'Car not found',
        ])->setStatusCode(ResponseInterface::HTTP_NOT_FOUND);
    }

    // Delete the car
    if ($carModel->delete($car_id)) {
        return $this->response->setJSON([
            'status' => 'success',
            'message' => 'Car deleted successfully',
        ])->setStatusCode(ResponseInterface::HTTP_OK);
    } else {
        return $this->response->setJSON([
            'status' => 'error',
            'message' => 'Failed to delete car',
        ])->setStatusCode(ResponseInterface::HTTP_INTERNAL_SERVER_ERROR);
    }
}






 //Update 
 public function carUpdate($id)
 {
     $carModel = new CarModel();
     $uploadHandler = new UploadHandler();
 
     // Check if the car exists
     $car = $carModel->find($id);
     if (!$car) {
         return $this->response->setJSON([
             'status' => 'error',
             'message' => 'Car not found',
         ])->setStatusCode(ResponseInterface::HTTP_NOT_FOUND);
     }
     
     // Get updated data from the request
     $name = $this->request->getPost('name');
     $brand = $this->request->getPost('brand');
     $model = $this->request->getPost('model');
     $fuel_type = $this->request->getPost('fuel_type');
     $daily_rate = $this->request->getPost('daily_rate');
     $availability = $this->request->getPost('availability');
 
     $file = $this->request->getFile('car_image');
            if(!$file){
                $imgUrl = $car['car_image']; 
            }
        else{
            $newImageName = $uploadHandler->uploadFile($file);

            // Construire l'URL de l'image pour la base de données
            $imgUrl = base_url('uploads/' . $newImageName);
        }
 

 
     // Update car data with new values
     $data = [
         'car_name' => $name,
         'car_image' => $imgUrl,
         'brand' => $brand,
         'model' => $model,
         'fuel_type' => $fuel_type,
         'daily_rate' => $daily_rate,
         'availability' => $availability,
     ];
 
     // Attempt to update the car
     $isUpdated = $carModel->update($id, $data);
     if ($isUpdated) {
         return $this->response->setJSON([
             'status' => 'success',
             'message' => 'Car updated successfully',
         ])->setStatusCode(ResponseInterface::HTTP_OK);
     } else {
         // Log errors if update fails
         error_log('Update failed: ' . json_encode($carModel->errors()));
         return $this->response->setJSON([
             'status' => 'error',
             'message' => 'Failed to update car',
         ])->setStatusCode(ResponseInterface::HTTP_INTERNAL_SERVER_ERROR);
     }
 }
 






}
