const express = require("express");
const needle = require("needle");
const cors = require("cors");
require("dotenv").config({ path: "./config.env" }); 
const app = express();

const apiKey = process.env.API_KEY;
const apiUrl = process.env.API_URL;
const corsOrigin = process.env.CORS_ORIGIN;
const port = process.env.PORT;

app.use(cors());

app.get("/hello", (req, res) => {
  res.send("Hello, world!");
});

app.get("/", async (req, res) => {
  const base_currency = req.query.base || "USD";
  const target_currency = req.query.target || "EUR";

  try {
    const url = `${apiUrl}${apiKey}/latest/${base_currency}`;
    const response = await needle("get", url);

    if (response.body && response.body.conversion_rates) {
      const rate = response.body.conversion_rates[target_currency];
      res.json({ rate });
    } else {
      res.status(500).send("Error fetching data");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching data");
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
