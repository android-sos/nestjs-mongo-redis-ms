
# Getting started

## Installation

Clone the repository

    git clone ----------------

Switch to the repo folder

    cd ----------------
    
Install dependencies
    
    npm install

Copy config file and set JsonWebToken secret key

    cp src/config.ts.example src/config.ts
    
----------

## Database

The example codebase uses [Typeorm](http://typeorm.io/) with a mySQL database.

Create a new mysql database with the name `bintrix_crm` (or the name you specified in the ormconfig.json)

Copy Typeorm config example file for database settings

    cp ormconfig.json.example ``
    
Set mysql database settings in ormconfig.json

    {
        "type": "mysql",
        "host": "127.0.0.1",
        "port": 3306,
        "username": "bintrix_user",
        "password": "12345678",
        "database": "bintrix_crm",
        "entities": ["src/**/**.entity{.ts,.js}"],
        "synchronize": true
    }
    
Start local mysql server and create new database 'bintrix_crm'

On application start, tables for all entities will be created.

----------
Install Maria DB
sudo apt install mariadb-server

Start Maria DB
sudo systemctl status mariadb

Set Scurity
sudo mysql_secure_installation

Test connection
mysql -u root -p

CREATE USER 'bintrix_user'@'localhost' IDENTIFIED BY '12345678';

Acceso al servidor
MariaDB [(none)]> GRANT USAGE ON *.* TO 'bintrix_user'@localhost IDENTIFIED BY '12345678';
Query OK, 0 rows affected (0.00 sec)

Acceso a la base de datos
MariaDB [(none)]> GRANT ALL privileges ON `bintrix_crm`.* TO 'bintrix_user'@localhost;
Query OK, 0 rows affected (0.00 sec)

MariaDB [(none)]> 


## NPM scripts

- `npm start` - Start application
- `npm run start:watch` - Start application in watch mode
- `npm run test` - run Jest test runner 
- `npm run start:prod` - Build application

----------

## API Specification

This application adheres to the api specifications set by the [Thinkster](https://github.com/gothinkster) team. This helps mix and match any backend with any other frontend without conflicts.

> [Full API Spec](https://github.com/gothinkster/realworld/tree/master/api)

More information regarding the project can be found here https://github.com/gothinkster/realworld

----------

## Start application

- `npm start`
- Test api with `http://localhost:3000/api/articles` in your favourite browser

----------

# Authentication
 
This applications uses JSON Web Token (JWT) to handle authentication. The token is passed with each request using the `Authorization` header with `Token` scheme. The JWT authentication middleware handles the validation and authentication of the token. Please check the following sources to learn more about JWT.

----------
 
# Swagger API docs

This example repo uses the NestJS swagger module for API documentation. [NestJS Swagger](https://github.com/nestjs/swagger) - [www.swagger.io](https://swagger.io/)        