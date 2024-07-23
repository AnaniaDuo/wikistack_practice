const express = require("express");
const router = express.Router();
const { main, addPage, wikiPage, editPage } = require("../../views");
const { db, Page, User } = require("../../models");

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
    });
    console.log("get the page");
    if (page === null) {
      res.sendStatus(404);
    } else {
      console.log("get to else");
      const user = await page.getAuthor();
      res.send(editPage(page, user));
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
    });
    if (page === null) {
      res.sendStatus(404);
    } else {
      const author = await page.getAuthor();
      res.send(wikiPage(page, author));
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;
