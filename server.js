const express = require("express");
const fetch = require("node-fetch");
const app = express();
const PORT = process.env.PORT || 3000;

const dotenv = require("dotenv");
dotenv.config();

const apiKey = process.env.API_kEY;
const headlineurl = `https://newsapi.org/v2/top-headlines?sources=bbc-news&apiKey=${apiKey}`;

// Serve static files from the public directory
app.use(express.static("public"));

// Proxy endpoint to fetch news
app.get("/headline", async (req, res) => {
  try {
    const response = await fetch(headlineurl);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Error fetching data" });
  }
});

app.get("/search", async (req, res) => {
  const searchValue = req.query.search || "latest";
  const searchurl = `https://newsapi.org/v2/everything?q=${searchValue}&sources=bbc-news&pageSize=20&apiKey=${apiKey}`;

  try {
    const response = await fetch(searchurl);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Error fetching data" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
