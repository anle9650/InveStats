const mongoose = require("mongoose"),
    Stock = require("./models/stock");

mongoose.Promise = global.Promise;
mongoose.connect(
    process.env.MONGODB_URI || "mongodb://localhost:27017/investats",
    { useNewUrlParser: true }
);

Stock.remove({})
    .then(() => {
        return Stock.create({
            _id: "60fb97a4c0d03d2840ef2dec",
            name: "International Business Machines Corp",
            symbol: "IBM",
            transactions: [
                {
                    datetime: new Date('2020, 7, 21'),
                    price: 126.0600,
                    shares: 1,
                }
            ],
        });
    })
    .then(stock => console.log(stock.name))
    .then(() => {
        return Stock.create({
            _id: "60fb97a5c0d03d2840ef2def",
            name: "Tesco PLC",
            symbol: "TSCO.LON",
            transactions: [
                {
                    datetime: new Date('2020, 7, 22'),
                    price: 214.5000,
                    shares: 1,
                }
            ],
        });
    })
    .then(stock => console.log(stock.name))
    .then(() => {
        return Stock.create({
            _id: "60fb97a5c0d03d2840ef2df2",
            name: "Shopify Inc",
            symbol: "SHOP.TRT",
            transactions: [
                {
                    datetime: new Date('2020, 7, 20'),
                    price: 1368.0000,
                    shares: 1,
                }
            ],
        });
    })
    .then(stock => console.log(stock.name))
    .catch(error => console.log(error.message))
    .then(() => {
        console.log("DONE");
        mongoose.connection.close();
    });