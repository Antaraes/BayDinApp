const BayDinRouter = require("./BayDinRoute");

const apiRouter = require("express").Router();

apiRouter.use("/bayDins", BayDinRouter);

module.exports = apiRouter;
