const request = require('request');
const cheerio = require('cheerio');

function singleScraper(products, callback) {
    let productArray = [];

    function Product(url, name, img) {
        this.url = url;
        this.name = name;
        this.img = img;
    }

    function aitecProduct(index) {
        const i = index;

        request({
            url: products[i].url,
            method: 'GET',
        }, (e, r, b) => {
            const $ = cheerio.load(b);
            const eIMGs = $('ul.photo-slider > li > img');
            let IMG = [];
            eIMGs.each((ii, eImg) => {
                // console.log(eImg.attribs.src);
                IMG.push(`http:${eImg.attribs.src}`);
            });

            const ePrice = $('#recommanded-price');
            const PRICE = ePrice[0].children[0].data.trim();
            console.log(PRICE);

        });
    }

    aitecProduct(0);
}

module.exports = singleScraper;
