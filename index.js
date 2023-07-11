const { default: axios } = require("axios");
const express = require("express");
const app = express();

const port = 3000;

app.use(express.json());

// Static File
app.use(express.static("public"));
app.use("/css", express.static(__dirname + "public/css"));

// Templating Engine
app.set("views", "./src/views");
// app.set("newsSingle", "./src/newsSingle.ejs");
app.set("view engine", "ejs");

// API to fetch all the news articles
app.get("/", async (req, resp) => {
  try {
    const newsAPI = await axios.get(`https://raddy.dev/wp-json/wp/v2/posts/`);
    resp.render("view", { articles: newsAPI.data });
  } catch (error) {
    console.error(error);
  }
});

// API to fetch data of one news article
app.get("/article/:id", async (req, resp) => {
  const articleId = req.params.id;
  try {
    const newsAPI = await axios.get(
      `https://raddy.dev/wp-json/wp/v2/posts/${articleId}`
    );
    resp.render("newsSingle", { article: newsAPI.data });
  } catch (error) {
    console.error(error);
  }
});

// API to search the news article
app.post("", async (req, resp) => {
  const search = req.body.search;
  try {
    const newsAPI = await axios.get(
      `https://raddy.dev/wp-json/wp/v2/posts?search=${search}`
    );
    resp.render("newsSearch", { articles: newsAPI.data });
  } catch (error) {
    console.error(error);
  }
});

app.listen(port);
