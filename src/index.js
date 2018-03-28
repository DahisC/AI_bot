const path = require('path');
const express = require('express');
const scraper = require('./scraper.js');

const app = express();

app.use(express.static('../node_modules/xlsx/dist'));

app.get('/', (req, res) => {
    res.sendFile((path.join(__dirname, '/index.html')));
});

app.get('/scraper', (req, res) => {
    scraper((products) => {
        // res.send(products);
        // res.writeHead(200, {'Content-Type': 'text/plain'});
        res.write('123213213');
    });
});

app.listen(9001, () => { console.log('Server start on port 9001'); });
