const Router = require("express");
const router = new Router();
const promocodeRouter = require("./promocode.router");

router.use("/promocode", promocodeRouter);

module.exports = router;
