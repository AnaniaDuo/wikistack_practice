const html = require("html-template-tag");
const layout = require("./layout");

module.exports = (err) =>
  layout(html`
    <h1>Internal Server: Error ${err}</h1>
    <a href="/wiki">Back to Home Page</a>
  `);
