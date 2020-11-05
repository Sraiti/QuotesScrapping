if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const cheerio = require("cheerio");
const axios = require("axios");
const port = 3000 || process.env.PORT;
const app = express();
const url = "http://quotes.toscrape.com/page/";

app.use(express.json());

app.get("/:id", async (req, res) => {
  const id = req.params.id || 1;

  try {
    const { data } = await axios.get(url + id);
    const $ = cheerio.load(data);
    const response = $(".quote");
    console.log(`\n response is : ${id} \n`);
    const dt = [];
     response.each((i, element) => {
      $element = $(element);
      const quotes = {};
      quotes.quoteText = $element.find(".text").text().trim();
      quotes.author = $element.find(".author").text().trim();
      quotes.authorLink = $element.find("span").children().last().attr("href");
      quotes.tags = [];
      $element.find("div .tag").each((i, item) => {
        $item = $(item);
        quotes.tags.push($item.text());
      });
      dt.push(quotes);
    });
    res.json(dt);
  } catch (error) {
    console.log(error);
  }
});

app.listen(port, () => console.log(`Example app listening on port ${port}`));
