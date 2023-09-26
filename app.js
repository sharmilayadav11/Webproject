// WEB SERVER FOR ELECTRICITY PRICE TRACKING AND FORECASTING
// ======================================================

// LIBRARY IMPORTS
// ---------------

// Load necessary Express libraries
const express = require('express');
const fetch = require('node-fetch'); // For making HTTP requests in Node.js
const { engine } = require('express-handlebars');

// EXPRESS APPLICATION SETTINGS
// -----------------------------

// Create an Express application and define the listening TCP port
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
    // Handle login logic here (validate credentials, etc.)

    // If login is successful, redirect to the hourly page
    res.redirect('/hourly');
});

// Define a route for the Weather page
app.get('/weather', (req, res) => {
    // Render the Weather template
    res.render('weather');
});

// Dropdown menu redirecting
app.get('/menu', (req, res) => {
    const menuItem = req.query.item; // Get the clicked menu item from the query parameter
    const currentPage = req.query.page; // Get the current page from the query parameter

    if (menuItem === 'hintaseuranta') {
        // Redirect to the hourly page
        res.redirect('/hourly');
    } else if (menuItem === 'weather') {
        // Redirect to the weather page
        res.redirect('/weather');
    } else {
        // Handle other menu items as needed
        res.send('Unknown menu item');
    }
});



// Fetch electricity data from the API
app.get('/hourly', async (req, res) => {
    try {
        const PRICE_ENDPOINT = 'https://api.porssisahko.net/v1/price.json';

        const dateAndTimeNow = new Date();
        const date = dateAndTimeNow.toISOString().split('T')[0];
        const hour = dateAndTimeNow.getHours();

        const response = await fetch(`${PRICE_ENDPOINT}?date=${date}&hour=${hour}`);
        const { price } = await response.json();

        // Render the hourly page and pass the price data as a variable
        res.render('hourly', { electricityPrice: price });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch electricity price data' });
    }
});

// START THE SERVER
app.listen(PORT, () => {
    console.log(`Server is listening port ${PORT}`);
});
