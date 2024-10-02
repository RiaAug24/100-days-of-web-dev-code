const Quote = require("../model/quote.model");
let getRandomQuote = async (req, res) => {
  let randomQuote;
  try {
    randomQuote = await Quote.getRandomQuote();
    res.json({
      quote: randomQuote,
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  getRandomQuote: getRandomQuote,
};
