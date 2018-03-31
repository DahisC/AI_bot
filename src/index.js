const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const scraper = require('./scraper.js');
const singleScraper = require('./singleScraper.js');

const app = express();

// app.use(express.bodyParser());
const jsonParser = bodyParser.json();
app.use(express.static('../node_modules/xlsx/dist'));

app.get('/', (req, res) => {
    res.sendFile((path.join(__dirname, '/index.html')));
});

app.get('/scraper', (req, res) => {
    scraper((products) => {
        res.send(products);
    });
});

app.post('/singleScraper', jsonParser, (req, res) => {
    singleScraper(req.body.payload, (products) => {
        res.send(products);
    });
});

app.listen(9001, () => { console.log('Server start on port 9001'); });
