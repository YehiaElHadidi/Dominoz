// imports
const express = require("express");
const app = express();
const port = 3000;

// Static Files
app.use(express.static("public"));
app.use("/css", express(__dirname + "public/css"));
app.use("/js", express(__dirname + "public/js"));
app.use("/img", express(__dirname + "public/img"));

// Set Views
app.set("views", "./views");
app.set("view engine", "ejs");

app.get("", (req, res) => {
  res.render("index");
});
app.get("/uninformed", (req, res) => {
  res.render("uninformed");
});
// Listen on port 3000
app.listen(port, () => console.info(`Listening on port ${port}`));
