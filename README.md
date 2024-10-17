# Sähkönseuranta
 
## In order to run
###  Use docker to start the postgres
 
    docker compose up -d

This will start the postgres sql server on port 5432

### Install packages

    npm install

### Run microservices to fetch some data to populate the tables

    node microservice.js

wait for few min to get the data.

### Run the app

    node app.js

this will run the app on port 8080.

### Access the on the browser http://localhost:8080

    Username: admin
    Password: admin
