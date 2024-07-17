"use strict";

const express = require("express");
const {
  newsApiKey,
  newsUrl,
  newsSearchQueryParam,
  newsApiKeyQueryParam,
  newsQueryForEnglish,
} = require("./constants");

const { getTopArticles } = require("./gemini");

const app = express();

app.use(express.json());
const port = 6000;

app.listen(port, () => {
  console.log(`notification engine listening on port ${port}`);
});

// receives preferences and returns the top interesting articles
app.post("/", async (req, res) => {
  const preferences = req.body.preferences;
  let status, message, articles, topArticles;

  [articles, status, message] = await getArticles(preferences);

  if (status !== 200) {
    res.status(status).send(message);
  } else {
    [topArticles, status, message] = await getTopArticles(
      articles,
      preferences
    );

    if (status !== 200) {
      res.status(status).send(topArticles);
    } else {
      res.status(status).send(JSON.parse(topArticles));
    }
  }
});

async function getArticles(preferences) {
  let articles = [];
  let status = 200;
  let message;

  if (preferences) {
    try {
      for (const p of preferences) {
        const result = await fetch(
          `${newsUrl}?${newsApiKeyQueryParam}=${newsApiKey}&${newsSearchQueryParam}=${p}&${newsQueryForEnglish}`
        );
        const json = await result.json();

        if (json.results) {
          articles = articles.concat(json.results);
        }
      }
    } catch (error) {
      status = 500;
      message = "Error: " + error.message;
    }
  } else {
    status = 400;
    message = "Bad Request. Please send valid preferences.";
  }

  articles = articles.map((article) => ({
    title: article.title,
    link: article.link,
  }));

  return [articles, status, message];
}
