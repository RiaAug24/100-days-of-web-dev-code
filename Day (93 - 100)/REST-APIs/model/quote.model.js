const db = require("../data/database");

class Quote {
  static async getRandomQuote() {
    const quotes = await db.getDb().collection("quotes").find().toArray();
    console.log(quotes[3]);
    const randomQuoteIndex = Math.floor(Math.random() * quotes.length);
    const randomQuote = quotes[randomQuoteIndex]
    return randomQuote;
  }
}

module.exports = Quote;
