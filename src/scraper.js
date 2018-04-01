const request = require('request');
const cheerio = require('cheerio');

function scraper(callback) {
    const website = 'http://www.ai-tec.com.tw/collections/%E6%89%80%E6%9C%89%E5%95%86%E5%93%81?page=';
    let searchPage = 1;

    let productArray = [];
    function Product(url, name, img) {
        this.url = url;
        this.name = name;
        this.img = img;
    }

    function aitecWebsite() {
        request({
            url: website + searchPage,
            method: 'GET',
        }, (e, r, b) => {
            const $ = cheerio.load(b);
            const products = $('section.products-content .row > div .product-col');

            products.each((index, product) => {
                const eURL = $(product).find('div.image a');
                const URL = `http://www.ai-tec.com.tw${eURL[0].attribs.href}`;

                const eName = $(product).find('div.image a');
                const NAME = eName[0].attribs.title;

                const eIMG = $(product).find('div.image img');
                const IMG = `http:${eIMG[0].attribs.src}`;
                // console.log(IMG);

                productArray.push(new Product(URL, NAME, IMG));
            });

            if (products.length === 16) {
                console.log(productArray.length);
                console.log(`目前頁數：${searchPage} - 準備搜尋下一頁。`);
                searchPage += 1;
                aitecWebsite();
                // callback(productArray);
            } else {
                console.log(`目前頁數：${searchPage} - 搜尋完成。`);
                console.log(productArray.length);
                callback(productArray);
            }
        });
    }

    aitecWebsite();
}

module.exports = scraper;
