// electricityCalculations.js

// Sample data (you should replace this with your actual data)
var electricityData = [
    { hour: "00:00-01:00", price: 0.12 },
    { hour: "01:00-02:00", price: 0.14 },
    { hour: "02:00-03:00", price: 0.11 },
    // ... (your data here)
];

// Calculate highest electricity hour
var highestHour = electricityData.reduce((prev, current) => {
    return (prev.price > current.price) ? prev : current;
});

// Calculate lowest electricity hour
var lowestHour = electricityData.reduce((prev, current) => {
    return (prev.price < current.price) ? prev : current;
});

// Calculate today's average price for electricity
var totalPrices = electricityData.reduce((total, data) => total + data.price, 0);
var averagePrice = totalPrices / electricityData.length;

// Export the calculated values
module.exports = {
    highestHour: highestHour,
    lowestHour: lowestHour,
    averagePrice: averagePrice
};
