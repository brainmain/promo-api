const ApiError = require(`../errors/api.error`);
const promocodeService = require("../services/promocode.service");

class promocodeController {
  async createUserPromocode(req, res, next) {
    try {
      const { userId } = req.body;

      if (!userId) {
        return next(ApiError.badRequest("User id is required"));
      }

      const promocode = await promocodeService.createUserPromocode(userId);

      return res.json({ promocode });
    } catch (e) {
      next(e);
    }
  }

  async activatePromocode(req, res, next) {
    try {
      const { userId, code } = req.body;

      if (!userId || !code) {
        return next(ApiError.badRequest("User id and code are required"));
      }
      const data = await promocodeService.activatePromocode(userId, code);

      return res.status(data.status).send(data.message);
    } catch (e) {
      next(e);
    }
  }

  async geReward(req, res, next) {
    try {
      const { userId } = req.body;

      if (!userId) {
        return next(ApiError.badRequest("User id is required"));
      }

      const data = await promocodeService.geReward(userId);

      return res.status(data.status).send(data.message);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new promocodeController();
