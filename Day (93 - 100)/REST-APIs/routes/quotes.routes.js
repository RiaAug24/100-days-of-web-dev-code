const express = require("express");
const router = express.Router();
const quotesController = require("../controller/quote.controller");
router.get("/", quotesController.getRandomQuote);

module.exports = router;
