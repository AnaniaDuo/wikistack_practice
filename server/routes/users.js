const express = require("express");
const router = express.Router();
const { User, Page } = require("../../models");
const { listUsers, userPages } = require("../../views");

// GET /users
router.get("/", async (req, res, next) => {
  try {
    const users = await User.findAll();
    console.log("users are", users);
    res.send(listUsers(users));
  } catch (error) {
    next(error);
  }
});

// GET /user
router.get("/:userId", async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.userId);
    console.log("what is user", user);
    const pages = await Page.findAll({
      where: {
        authorId: req.params.userId,
      },
    });
    console.log("what is pages", pages);
    res.send(userPages(user, pages));
  } catch (err) {
    next(err);
  }
});

module.exports = router;
