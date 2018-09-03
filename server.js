const express = require("express");
const bodyParser = require("body-parser");

// Project imports
const blocks = require("./routes/api/blocks");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("PRIVATE BLOCKCHAIN API");
});

// ROUTES
app.use("/api/blocks", blocks);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
