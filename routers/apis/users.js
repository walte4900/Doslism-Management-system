// 登录和注册的API
// 引入第三方包：express框架，密码加密器 bcrypt, 头像库gravatar, token生成器jwt
const express = require("express");
const bcrypt = require("bcrypt");
const gravatar = require("gravatar");
const jwt = require("jsonwebtoken");
const passport = require("passport");
// 引入外部文件： user表格， 生成token的key
const User = require("../../models/user");
const keys = require("../../config/keys");

// 建立路由
const router = express.Router();

// 注册事件
// $route POST api/users/register
// @desc 返回请求的json数据
// @access public
router.post("/register", (req, res) => {
  // console.log(req.body);
  // 查询数据库是否有邮箱
  User.findOne({ email: req.body.email }).then((user) => {
    if (user) return res.status(400).json({ email: "邮箱已被注册！" });
    // 默认头像
    var avatar = gravatar.url(req.body.email, { s: "200", r: "pg", d: "mm" });
    // 创建新用户的对象，格式和models内定义的schema相同
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      avatar: avatar,
      identity: req.body.identity,
      password: req.body.password,
    });

    // 密码加密并存入数据库
    bcrypt.genSalt(10, function (err, salt) {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;

        // 加密密码
        newUser.password = hash;
        // 写入数据库
        newUser
          .save()
          .then((user) => {
            // 保证安全防xxs，csrf
            res.cookie("name","doslism",{httpOnly:true});
            res.json(user);
          })
          .catch((err) => console.log(err));
      });
    });
  });
});


// 登录事件
// $route POST api/users/login
// @desc 返回请求的token jwt passport
// @access public
router.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  //
  User.findOne({ email: email }).then((user) => {
    if (!user) return res.status(404).json({ email: "用户不存在" });

    bcrypt.compare(password, user.password).then((isMatch) => {
      if (isMatch) {
        // 规则 命名 过期时间 回调函数
        const rule = {
          id:user.id, 
          email: user.email,
          name:user.name,
          avatar:user.avatar,
          identity: user.identity
        };
        const key = keys.secretOrKey;
        jwt.sign(rule,key,{expiresIn: 3600},(err,token)=>{
            // 保证安全防xxs，csrf
            res.cookie("name","doslism",{httpOnly:true});
            res.json({
                success: true,
                token: "Bearer " + token
            })
        }).catch(err => {
            return err;
        });
        // return res.json({ msg: "success" });
      } else {
        return res.status(400).json({ password: "用户名或者密码不匹配。" });
      }
    });
  });
});



// 检测登录状态
// $route GET api/users/current
// @desc  返回当前登录的用户
// @access private
// 地址 验证token 回调函数
router.get("/current",passport.authenticate('jwt',{session:false}),
(req,res)=>{
  res.json({
    id: req.user.id,
    email: req.user.email,
    name: req.user.name,
    avatar:req.user.avatar,
    identity: req.user.identity
  });
});


// 导出为模块
module.exports = router;
