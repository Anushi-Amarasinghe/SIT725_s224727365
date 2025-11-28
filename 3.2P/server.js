var express = require("express");
var path = require("path");
var app = express();

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.post("/upload", function (req, res) {
  res.status(400).json({ error: "Image upload functionality has been removed" });
});

var port = process.env.PORT || 3000;

app.listen(port, function () {
  console.log("Movie App running on port " + port);
});
