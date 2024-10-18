# Sähkönseuranta
 It is app developed using node js which helps to show cost of electricity on daily hourly basis. 
 It shows Electricity calculations with its timing
The most expensive electricity hour: 1 hour time frame (e.g.19:00-20:00)
The cheapest electricity hour: 1 hour time frame (e.g. 00:00-01:00)
Today's average: in cents / kWh

It uses API from porssisahko.net to get current prices of electricity.
https://api.porssisahko.net/v1/latest-prices.json

In this posGres is used via docker container.

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
