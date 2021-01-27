const mongoose = require("mongoose");
const schema = mongoose.Schema;

// 创建用户数据库的 Schema
const ProfileSchema = schema({
  identity: {
    type: String,
  },
  describe: {
    type: String,
  },
  income: {
    type: String,
    required: true,
  },
  expend: {
    type: String,
    required: true,
  },
  cash: {
    type: String,
    required: true,
  },
  remark: {
    type: String,
  },

});

module.exports = Profile = mongoose.model("profile", ProfileSchema);
