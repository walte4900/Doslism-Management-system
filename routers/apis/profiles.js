// 登录和注册的API
// 引入第三方包：express框架，密码加密器 bcrypt, 头像库gravatar, token生成器jwt
const express = require("express");
const passport = require("passport");
// 引入外部文件： user表格， 生成token的key
const profile = require("../../models/profile");
// 建立路由
const router = express.Router();


// 用GET测试 /api/profiles/test 是否可用
router.get('/test',(req,res)=>{
    return res.json({msg:"keyong"});
});



// 导出 路由 为模块
module.exports = router;
