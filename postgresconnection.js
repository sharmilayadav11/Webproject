// Asiakas-palvelimeen yhdistäminen
const { Client } = require('pg');

const client = new Client({
    user: 'your_username',
    host: 'localhost', // Tai vaihtoehtoisesti tietokantapalvelimen isäntänimi
    database: 'your_database_name',
    password: 'your_password',
    port: 5432, // PostgreSQL oletusportti
});