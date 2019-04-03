const express = require('express');
const Scraper = require("@jonstuebe/scraper");
const app = express();
var savedProduct;

// Allow any method from any host and log requests
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, DELETE');
    if ('OPTIONS' === req.method) {
        res.sendStatus(200);
    } else {
        console.log(`${req.ip} ${req.method} ${req.url}`);
        next();
    }
});

// Handle POST requests that come in formatted as JSON
app.use(express.json());

// A default hello word route
app.get('/', (req, res) => {
    res.send({ hello: 'world' });
});

app.get('/cathy', (req, res) => {
    res.send({ message: "IT WORKS END TO END!" });
});

app.post('/product', (req, res) => {
    (async () => {
        var url = `http://www.amazon.com/gp/product/${req.body.ASIN}`;
        const site = {
            name: "Amazon",
            hosts: ["www.amazon.com"],
            scrape: async page => {
                const manufacturer = await Scraper.getText("#productDetails_detailBullets_sections1 > tbody > tr:nth-child(4) > td", page);
                const brand_name = await Scraper.getText("#bylineInfo", page);
                const product_name = await Scraper.getText("#productTitle", page);
                const price = await Scraper.getText("#priceblock_ourprice", page);
                const original_price = await Scraper.getText("#price > table > tbody > tr:nth-child(1) > td.a-span12.a-color-secondary.a-size-base > span.priceBlockStrikePriceString.a-text-strike", page);
                const inStock = await Scraper.getText("#availability > span", page);
                const product_description = await Scraper.getText("#productDescription > p", page);
                const soldBy = await Scraper.getText("#comparison_sold_by_row > td.comparison_baseitem_column > span", page);
                const image = await Scraper.getSrc("#landingImage", page);
                const original_url = url;
                return {
                    manufacturer,
                    brand_name,
                    product_name,
                    price,
                    original_price,
                    inStock,
                    product_description,
                    soldBy,
                    image,
                    original_url
                };
            }
        };
        const data = await Scraper.scrape(
            url,
            site
        );
        res.send(data);
        console.log(data);
    })();
});

app.post('/saveProduct', (req, res) => {
    savedProduct = req.body; 
    console.log("SAVED PRODUCT: ",savedProduct);
});


app.get('/api/addedProduct', (req, res) => {
    console.log("Sending data over to other application.");
    res.send(savedProduct);
})

// start our server on port 4201
app.listen(4201, '127.0.0.1', function () {
    console.log("Server now listening on 4201");
});