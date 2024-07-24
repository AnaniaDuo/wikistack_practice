const express = require("express");
const router = express.Router();
const { User, Page } = require("../../models");
const { listUsers, userPages, notFoundPage } = require("../../views");

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
    // use eager loading to avoid 2 SQL queries
    const user = await User.findByPk(req.params.userId, {
      include: [{ model: Page }],
    });

    if (!user) {
      console.log("there is no user", user);
      res.send(notFoundPage());
    } else {
      res.send(userPages(user, user.pages));
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;
