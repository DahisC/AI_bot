const request = require('request');
const cheerio = require('cheerio');

function singleScraper(products, callback) {
    let productArray = products;

    function Product(url, name, img) {
        this.url = url;
        this.name = name;
        this.img = img;
    }

    function aitecProduct(index) {
        let i = index;

        request({
            url: productArray[i].url,
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
            let PRICE = ePrice[0].children[0].data.trim();
            PRICE = /\d.*/.exec(PRICE);

            productArray[i].img = IMG;
            // productArray[i].price = PRICE[0]; // error: eslint: prefer destructuring 使用解構賦值
            [productArray[i].price] = PRICE; // 修正後

            console.log(productArray[i]);

            if ((i + 1) !== productArray.length) {
                i += 1;
                aitecProduct(i);
            } else {
                console.log(productArray);
                callback(productArray);
            }
        });
    }

    aitecProduct(0);
}

module.exports = singleScraper;
