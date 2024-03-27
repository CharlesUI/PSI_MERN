const fs = require('fs');
const data = require("./data.json");

// Function to generate a random integer within a specified range
const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Iterate through the data and add STOCK_COUNT and AVAILABILITY properties
const modifiedData = data.data.map(item => {
    // Generate a random stock count
    const stockCount = getRandomInt(0, 100); // Adjust range as needed

    // Set availability based on stock count
    const availability = stockCount > 0;

    return {
        ...item,
        STOCK_COUNT: stockCount,
        AVAILABILITY: availability
    };
});

// Convert the modified data to JSON format
const newDataJSON = JSON.stringify(modifiedData, null, 2);

// Write the JSON data to a new file called newData.json
fs.writeFile('newData.json', newDataJSON, (err) => {
    if (err) throw err;
    console.log('New data has been written to newData.json');
});
