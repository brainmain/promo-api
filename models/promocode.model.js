const db = require("../db/index");

const schema = new db.Schema({
  userId: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
  usedBy: {
    type: Array,
    default: [],
  },
});

module.exports = db.model("Promocode", schema);
