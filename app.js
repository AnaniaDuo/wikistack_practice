const express = require("express");
const app = express();
const PORT = 8000;

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

app.get("/", (req, res) => {
  res.send(`<html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>My Site</title>
  </head>
  <body>
    <h1>Hello World</h1>
  </body>
</html>`);
});

app.get("/puppies", (req, res) => {
  res.send(`<html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>My Site</title>
  </head>
  <body>
    <h1>Puppy 1</h1>
    <h1>Puppy 2</h1>
    <h1>Puppy 3</h1>
  </body>
</html>`);
});
