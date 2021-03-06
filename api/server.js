if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const cheerio = require("cheerio");
const axios = require("axios");
const port = process.env.PORT || 3800;
const app = express();
const url = "http://quotes.toscrape.com/page/";
const urlAuthor = "http://quotes.toscrape.com/author/";

app.get("/api/author:authorName", async (req, res) => {
  const Name = req.params.authorName;
  try {
    const { data } = await axios.get(urlAuthor + Name);
    const $ = cheerio.load(data);
    const response = $(".author-details");
    console.log(`\n response is : ${Name} \n`);
    const dt = [];
    response.each((i, element) => {
      $element = $(element);
      const author = {};
      author.authorName = $element.find(".author-title").text().trim();
      author.authorBornDate = $element.find(".author-born-date").text().trim();
      author.authorBornLocation = $element
        .find(".author-born-location")
        .text()
        .trim();
      author.authorDescription = $element
        .find(".author-description")
        .text()
        .trim();

      dt.push(author);
    });
    res.json(dt);
  } catch (error) {
    console.log(error);
  }
});

app.get("/api/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const { data } = await axios.get(url + id);
    const $ = cheerio.load(data);
    const response = $(".quote");
    console.log(`\n response is : ${id} \n`);
    const dt = [];
    response.each((i, element) => {
      $element = $(element);
      const quotes = {};
      quotes.id = i;
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

app.listen(port, () =>
  console.log(`Quotes Web Scrapping Api  listening on port ${port}`)
);
