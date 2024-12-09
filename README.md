# car-rental-app
# car-rental-app
# car-rental-app

## Project Overview
The car-rental-app is a full-stack web application designed for car rentals. This guide provides step-by-step instructions to set up the project on your local machine.

---

## Project Setup Instructions 

Follow these detailed steps to set up and run the project successfully:

---

### 1. Import the Database
1. Open your  database management tool (e.g., phpMyAdmin).
2.  create database named rental_management.
3. Locate the provided SQL file (database.sql) in the project repository.
4. Import the SQL file into the rental_management database.
5. Verify that the database structure and data have been correctly imported.

---

### 2. Set Up the Frontend
1. install node js to run a react app 
2. setup the node js in enviroment variables
3. run node  -version to see if node js setuped correctly.
4. Open a terminal or command prompt on your local machine.
5. Navigate to the project directory where the repository has been cloned.
6. Change directory to the frontend folder:
   ```bash
   cd frontend

 ## Verify you are in the correct directory by listing the files  
   ls
 ## Install the required dependencies by running
  npm install to install all required react dependencies 



 ## Start the frontend development serve

  npm run dev

## ##### Set Up the Backend


## Open a new terminal
## Navigate to the backend folder

  cd backend

 ## Verify you are in the correct directory by listing the files  
   ls
   

## Install the necessary backend dependencies using Composer
composer install

## Start the backend server
 php spark serve
 

 ## make sure that The database is correctly imported and accessible.
 ## if the data it's not imported make sure that port in 
 ##      -( app-> config-> database.php ) 
 ##      - alsoin .env file you look for port is compatible with apache server
 ##      -  in PhpMyAdmin in congig.php and in my.ini look for port 





 ## Errors that you can get:

 ## CORS Error : check inside app->config-> cors.php and also filter.php  in the same directory config 
 ## inside app->filters->filters.php you should look for accept origin and make it *
 ## verify the cors also in .env file if still not working 

 ## for any other errors you can contact us in 

 ## hmad.aitlahmous.48@edu.uiz.ma 
 ## ahlamelfadli12@edu.uiz.ac.ma