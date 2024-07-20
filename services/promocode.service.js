const Promocode = require("../models/promocode.model");
const { maxNumberOfUsingPromocode } = require("../src/constants");

class promocodeService {
  async createPromocode() {
    try {
      // 62^5 = 916 132 832 variants of promocodes
      const characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      while (true) {
        let result = "";
        for (let i = 0; i < 5; i++) {
          const randomIndex = Math.floor(Math.random() * characters.length);
          result += characters[randomIndex];
        }

        const promocode = await Promocode.findOne({ code: result });
        if (promocode == null) {
          return result;
        }
      }
    } catch (e) {
      console.log("error: ", e);
    }
  }

  async createUserPromocode(userId) {
    try {
      const existingPromocode = await Promocode.findOne({ userId });
      if (existingPromocode) {
        return existingPromocode.code;
      }

      const code = await this.createPromocode();
      const promocode = await Promocode.create({ userId, code });

      return promocode.code;
    } catch (e) {
      console.log("error: ", e);
    }
  }

  async activatePromocode(userId, code) {
    try {
      const promocode = await Promocode.findOne({ code });
      if (!promocode) {
        return { status: 404, message: "Promocode not found" };
      }

      if (
        promocode.usedBy.includes(userId) ||
        promocode.userId === userId ||
        promocode.usedBy.length >= Number(maxNumberOfUsingPromocode)
      ) {
        return {
          status: 403,
          message:
            "Promocode is used or max number of using promocode is reached",
        };
      }

      promocode.usedBy.push(userId);
      await promocode.save();

      return { status: 200, message: "Promocode activated" };
    } catch (e) {
      console.log("error: ", e);
    }
  }

  async geReward(userId) {
    try {
      const promocode = await Promocode.findOne({ userId });
      if (!promocode) {
        return { status: 404, message: "Promocode not found" };
      }

      if (promocode.usedBy.length < Number(maxNumberOfUsingPromocode)) {
        return {
          status: 403,
          message: "Max number of using promocode is not reached",
        };
      }

      await Promocode.deleteOne({ userId });
      return { status: 200, message: "Reward is given" };
    } catch (e) {
      console.log("error: ", e);
    }
  }
}
module.exports = new promocodeService();
