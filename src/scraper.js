const request = require('request');
const cheerio = require('cheerio');

function scraper(callback) {
    const website = 'http://www.ai-tec.com.tw/collections/%E6%89%80%E6%9C%89%E5%95%86%E5%93%81?page=';
    let searchPage = 1;

    let productArray = [];
    function Product(name) {
        this.name = name;
    }

    function aitecWebsite() {
        request({
            url: website + searchPage,
            method: 'GET',
        }, (e, r, b) => {
            const $ = cheerio.load(b);
            const products = $('section.products-content .row > div .product-col');

            products.each((index, product) => {
                const eImg = $(product).find('div.image');
                let URL;
                URL = `http://www.ai-tec.com.tw${eImg[0].children[1].attribs.href}`;
                let NAME;
                NAME = eImg[0].children[1].attribs.title;
                console.log(`URL: ${URL}`);
                console.log(`NAME: ${NAME}`);
                let IMG;
                IMG = `http:${eImg[0].children[1].children[0].attribs.src}`;
                console.log(IMG);

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
