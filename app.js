// WEB SERVER FOR ELECTRICITY PRICE TRACKING AND FORECASTING
// ======================================================

// LIBRARY IMPORTS
// ---------------

// Load necessary Express libraries
const express = require('express');
const fetch = require('node-fetch'); // For making HTTP requests in Node.js
const { engine } = require('express-handlebars');
// Home made module to get current price
const cprice = require('./getHomePageData')
const { pool } = require('./microservice');


// EXPRESS APPLICATION SETTINGS
// -----------------------------

// Create an Express application and define the listening TCP port 8080
const app = express();
const PORT = process.env.PORT || 8080;

// Define the directory for resources, such as CSS files as 'public'
app.use(express.static('public'));

// Define template engine settings
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');

// Define the directory where views (pages) are located
app.set('views', './views');

// ROUTES
// ------

// Homepage route
app.get('/', (req, res) => {
    res.render('login');
});


// Add a route to login page
app.get('/login', (req, res) => {
    res.render('login'); // Assuming the template file is named 'login.handlebars'
});

// Adding a route for login POST process which handles logging in
app.post('/login', (req, res) => {
    // Handle login logic here (validate credentials, etc.) (there is no logic :D)

    // If login is successful, redirect to the hourly page
    res.redirect('/hourly');
});

// Define a route for the Hourly page
app.get('/hourly', async (req, res) => {
    try {
        const current_prices = await pool.query('SELECT * FROM current_prices');
        console.log(current_prices);
        res.render('hourly', { current_prices: JSON.stringify(current_prices) });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch electricity prices' });
    }
});



// DROPDOWN MENU
// --------------


// Dropdown menu redirecting
app.get('/menu', (req, res) => {
    const menuItem = req.query.item; // Get the clicked menu item from the query parameter
    const currentPage = req.query.page; // Get the current page from the query parameter

    if (menuItem === 'hintaseuranta') {
        // Redirect to the hourly page
        res.redirect('/hourly');
    } else if (menuItem === 'weather') {
        // Redirect to the weather page
        res.redirect('/turku-weather');
    } else {
        // Handle other menu items as needed
        res.send('Unknown menu item');
    }
});


// WEATHER DATA
// -------------

// Define a route to fetch Turku weather data
app.get('/turku-weather', async (req, res) => {
    try {
        // Replace 'YOUR_API_KEY' with your actual OpenWeatherMap API key
        const apiKey = 'c0d3914e82769f9af32c4e2b05c6d8f1';
        const city = 'Turku';
        const country = 'FI';

        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${apiKey}&units=metric`;

        const response = await fetch(apiUrl);
        const data = await response.json();

        // Render the weather.handlebars template with weather data
        res.render('turku-weather', { weatherData: data });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch weather data' });
    }
});

// Define a route for the Weather page
app.get('/turku-weather', (req, res) => {
    // Render the Weather template
    res.render('turku-weather');
});

// START THE SERVER
app.listen(PORT, () => {
    console.log(`Server is listening port ${PORT}`);
});