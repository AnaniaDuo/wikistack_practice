const layout = require("./layout");
const main = require("./main");
const addPage = require("./addpage");
const wikiPage = require("./wikipage");
const editPage = require("./editpage");
const listUsers = require("./userlist");
const userPages = require("./userpages");
const notFoundPage = require("./notfoundpage");
const internalErrorPage = require("./internalerrorpage");

module.exports = {
  layout,
  main,
  addPage,
  wikiPage,
  editPage,
  listUsers,
  userPages,
  notFoundPage,
  internalErrorPage,
};
