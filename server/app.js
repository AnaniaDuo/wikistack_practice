const express = require("express");
const app = express();
const morgan = require("morgan");
const path = require("path");

app.use(morgan("dev")); //logging middleware
app.use(express.static(path.join(__dirname, "..", "/public"))); //serving up static file
app.use(express.urlencoded({ extended: false })); //parsing middleware for form input data
app.use(express.json());
app.use(require("method-override")("_method"));

app.use("/wiki", require("./routes/wiki"));
app.use("/users", require("./routes/users"));

app.get("/", (req, res) => {
  res.redirect("/wiki/");
});

// any remaining request with an extension (.js, .css, etc.) send 404
app.use((err, req, res, next) => {
  console.log("what is error", err);
  if (path.extname(req.path).length) {
    const err = new Error("Not found");
    err.status = 404;
    next(err);
  } else {
    next();
  }
});

// sends index.html
app.use("*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public/index.html"));
});

// error handling endware
app.use((err, req, res, next) => {
  console.log("Error is", err);
  // console.error(err);
  // console.error(err.stack);
  // res.status(
  //   err.status(err?.status || 500).send(err?.message || "Internal Server")
  // );
});

module.exports = app;
