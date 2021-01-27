// 登录和注册的API
// 引入第三方包：express框架，密码加密器 bcrypt, 头像库gravatar, token生成器jwt
const express = require("express");
const passport = require("passport");
// 引入外部文件： Profile表格， 生成token的key
const Profile = require("../../models/profile");
// 建立路由
const router = express.Router();

// 用GET测试 /api/profiles/test 是否可用
router.get("/test", (req, res) => {
  return res.json({ msg: "keyong" });
});

// @POST POST api/profile/add
// @desc 创建信息的接口
// @access private
router.post(
  "/add",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const profileFields = {};
    if (req.body.type) profileFields.type = req.body.type;
    if (req.body.describe) profileFields.describe = req.body.describe;
    if (req.body.income) profileFields.income = req.body.income;
    if (req.body.expend) profileFields.expend = req.body.expend;
    if (req.body.cash) profileFields.cash = req.body.cash;
    if (req.body.remark) profileFields.remark = req.body.remark;
    if (req.body.user) profileFields.user = req.body.user;

    new Profile(profileFields).save().then((profile) => {
      res.json(profile);
    });
  }
);

// @POST GET api/profile/add
// @desc 获取所有信息的接口
// @access private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.find().then((profile) => {
      if (!profile) {
        return res.status(404).json("没有任何信息");
      }
      res.json(profile);
    });
  }
);

// @POST GET api/profile/add
// @desc 获取某些信息的接口
// @access private
// @url id为传过来的参数
router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ _id: req.params.id }).then((profile) => {
      if (!profile) {
        return res.status(404).json("没有任何信息");
      }
      res.json(profile);
    });
  }
);

// @PATCH PATCH api/profile/add
// @desc 修改某些信息的接口
// @access private
// @url id为传过来的参数
router.patch(
  "/edit/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const profileFields = {};
    if (req.body.type) profileFields.type = req.body.type;
    if (req.body.describe) profileFields.describe = req.body.describe;
    if (req.body.income) profileFields.income = req.body.income;
    if (req.body.expend) profileFields.expend = req.body.expend;
    if (req.body.cash) profileFields.cash = req.body.cash;
    if (req.body.remark) profileFields.remark = req.body.remark;
    if (req.body.user) profileFields.user = req.body.user;

    Profile.findOneAndUpdate(
      { _id: req.params.id },
      { $set: profileFields }, // set:要更新的对象
      { new: true }
    ).then((profile) => {
      res.json(profile);
    });
  }
);

// @POST DELETE api/profile/add
// @desc 删除某些信息的接口
// @access private
// @url id为传过来的参数
router.delete(
  "/delete/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOneAndDelete({ _id: req.params.id })
      .then((profile) => res.json(profile))
      .catch((err) => res.status(404).json("删除失败"));
  }
);

// 导出 路由 为模块
module.exports = router;
