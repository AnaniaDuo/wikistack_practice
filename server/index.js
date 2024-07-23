const app = require("./app");
const { db } = require("../models");
const PORT = 3000;

const init = async () => {
  try {
    await db.sync();
    app.listen(PORT, () => {
      console.log(`Listening at port ${PORT}`);
    });
  } catch (error) {
    console.error("Error starting server", error);
  }
};

init();
