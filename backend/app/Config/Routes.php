<?php

use CodeIgniter\Router\RouteCollection;

/**
 * @var RouteCollection $routes
 */
$routes->get('/', 'Home::index'); 
// $routes->post('/send', 'UserController::receiveData'); 

// $routes->post('/auth/signup', 'UserController::signUp');

$routes->get('/endpoint', 'ApiController::getData');
$routes->get('/userTest', 'DbController::index'); 
$routes->get('/users', 'UserController::index'); 
//admin routes
$routes->post('/add-car', 'CarController::addCar'); 
$routes->get('/cars', 'CarController::getCars'); 
$routes->delete('/delete/(:num)', 'CarController::deleteCar/$1');

$routes->put('/update/(:num)', 'CarController::carUpdate/$1'); 


$routes->post('/update/(:num)', 'CarController::carUpdate/$1');



//authentifications routes
$routes->post('/signup', 'UserController::signUp');  
$routes->post('/login', 'UserController::login');  
