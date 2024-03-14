const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const PORT = 8000;

app.set("view engine", "pug");

app.use("/css", express.static("public/css"));
app.use("/js", express.static("public/js"));
app.use("/img", express.static("public/img"));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse application/json
app.use(bodyParser.json());

// Routes
app.use("/", require("./routes/index"));
app.use("/events", require("./routes/events"));

// http://localhost:3000/
app.listen(PORT, (err) => {
  if (err) throw err;
  console.log(`This app is running on port ${PORT}`);
});
