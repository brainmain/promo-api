const Router = require("express");
const router = new Router();
const promocodeController = require("../controllers/promocode.controller");

router.post("/createUserPromocode", promocodeController.createUserPromocode);
router.post("/activatePromocode", promocodeController.activatePromocode);
router.get("/geReward", promocodeController.geReward);

module.exports = router;
