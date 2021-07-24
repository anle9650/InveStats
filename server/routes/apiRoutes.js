const router = require("express").Router(),
    portfoliosController = require("../controllers/portfoliosController");

router.get("/portfolios/:id", portfoliosController.show, portfoliosController.respondJSON);

module.exports = router;