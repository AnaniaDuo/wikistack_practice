const express = require("express");
const router = express.Router();
const {
  main,
  addPage,
  wikiPage,
  editPage,
  notFoundPage,
} = require("../../views");
const { db, Page, User } = require("../../models");

console.log("get to wiki----");

router.get("/", async (req, res, next) => {
  try {
    const pages = await Page.findAll();
    console.log("pages are", pages);
    res.send(main(pages));
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const [user, wasCreated] = await User.findOrCreate({
      where: {
        name: req.body.name,
        email: req.body.email,
      },
    });

    const page = await Page.create(req.body);
    await page.setAuthor(user);
    res.redirect("/wiki/" + page.slug);
  } catch (err) {
    next(err);
  }
});

router.put("/:slug", async (req, res, next) => {
  try {
    const [updatedRowCount, updatedPages] = await Page.update(req.body, {
      where: { slug: req.params.slug },
      returning: true,
    });

    console.log("what is udpatedRowCount, ");

    const user = await updatedPages[0].getAuthor();
    console.log("what is user to be updated", user);
    user.name = req.body.name;
    user.email = req.body.email;
    await user.save();

    res.redirect("/wiki/" + updatedPages[0].slug);
  } catch (err) {
    next(err);
  }
});

router.delete("/:slug", async (req, res, next) => {
  try {
    await Page.destroy({
      where: {
        slug: req.params.slug,
      },
    });
    res.redirect("/wiki");
  } catch (err) {
    next(err);
  }
});

router.get("/:slug/edit", async (req, res, next) => {
  try {
    const page = await Page.findOne({
      where: {
        slug: req.params.slug,
      },
      include: { model: User, as: "author" },
    });
    if (page === null) {
      res.send(notFoundPage());
    } else {
      res.send(editPage(page, page.author));
    }
  } catch (err) {
    next(err);
  }
});

router.get("/add", (req, res, next) => {
  try {
    res.send(addPage());
  } catch (err) {
    next(err);
  }
});

router.get("/:slug", async (req, res, next) => {
  try {
    const page = await Page.findOne({
      where: {
        slug: req.params.slug,
      },
      include: { model: User, as: "author" },
    });
    if (page === null) {
      res.send(notFoundPage());
    } else {
      console.log("what is page in get slug", page);
      res.send(wikiPage(page, page.author));
    }
  } catch (err) {
    next(err);
  }
});
module.exports = router;
