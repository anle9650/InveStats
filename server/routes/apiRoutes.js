const router = require("express").Router(),
    portfoliosController = require("../controllers/portfoliosController"),
    request = require("request");

router.get("/portfolios/:id", portfoliosController.show, portfoliosController.respondJSON);
router.get("/news", (req, res) => {
    request(`https://newsapi.org/v2/everything?apiKey=290461764c484a18b2e4a24fcba4a867&q=$${req.query.q}&from=${req.query.from}&language=en&sortBy=relevancy`, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            res.send(body);
        }
    });
});

module.exports = router;