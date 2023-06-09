const express = require("express");
const loader = require("./loader");
// const config = require("./config");
const { testRouter } = require("./controller");
const { locationController } = require("./controller/locationController");
const { stationsController } = require("./controller/stationsController");
const cors = require("cors");
const dotenv = require("dotenv");

async function createApp() {
  const config = dotenv.config().parsed;

  await loader.connectMongoDB();

  const app = express();

  app.use(
    cors({
      origin: [
        "http://localhost:3000",
        "https://jolly-horse-9de104.netlify.app",
      ],
    })
  );

  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  app.use("/", testRouter);
  app.use("/location", locationController);
  app.use("/api/stations", stationsController);

  app.use((req, res, next) => {
    res.status(404).send("Not Found");
    next(error);
  });

  // app.use((err, req, res, next) => {});
  const port = process.env.PORT || 5001;
  app.listen(port, () => {
    console.log("listening on port : ", port);
  });
}

module.exports = {
  createApp,
};
