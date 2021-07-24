const mongoose = require("mongoose"),
    Portfolio = require("./models/portfolio");

mongoose.Promise = global.Promise;
mongoose.connect(
    process.env.MONGODB_URI || "mongodb://localhost:27017/investats",
    { useNewUrlParser: true }
);

Portfolio.remove({})
    .then(() => {
        return Portfolio.create({
            stocks: ["60fb97a4c0d03d2840ef2dec", "60fb97a5c0d03d2840ef2def", "60fb97a5c0d03d2840ef2df2"]  
        });
    })
    .then(portfolio => console.log(portfolio.stocks))
    .catch(error => console.log(error.message))
    .then(() => {
        console.log("DONE");
        mongoose.connection.close();
    });