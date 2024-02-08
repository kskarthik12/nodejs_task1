const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 8000;

// Endpoint to create a text file with the current timestamp
app.get('/createFile', (req, res) => {
    const currentDate = new Date();
    const timestamp = currentDate.toISOString();
    const fileName = `${timestamp}.txt`;
    const folderPath = path.join(__dirname, 'file'); 

    const filePath = path.join(folderPath, fileName);

    // Write current timestamp to the file
    fs.writeFile(filePath, timestamp, (err) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error creating file');
        } else {
            res.send(`File ${fileName} created successfully`);
        }
    });
});

// Endpoint to retrieve all text files in a particular folder
app.get('/getTextFiles', (req, res) => {
    const folderPath = path.join(__dirname, 'file');

    fs.readdir(folderPath, (err, files) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error reading folder');
        } else {
            const textFiles = files.filter(file => path.extname(file) === '.txt');
            res.json(textFiles);
        }
    });
});

// Route handler for the root URL ("/")
app.get('/', (req, res) => {
    res.send('Welcome to the file creation and retrieval API. Use /createFile to create a text file and /getTextFiles to retrieve all text files.');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
