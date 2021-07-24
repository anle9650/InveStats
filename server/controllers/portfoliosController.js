const Portfolio = require("../models/portfolio"),
    httpStatus = require("http-status-codes");

module.exports = {
    show: (req, res, next) => {
        let portfolioId = req.params.id;
        Portfolio.findById(portfolioId)
            .then(portfolio => Portfolio.populate(portfolio, "stocks"))
            .then(portfolio => {
                res.locals.portfolio = portfolio;
                next();
            })
            .catch(error => {
                console.log(`Error fetching portfolio by ID: ${error.message}`);
                next(error);
            });
    },
    respondJSON: (req, res) => {
        res.json({
            status: httpStatus.OK,
            data: res.locals
        });
    }
}