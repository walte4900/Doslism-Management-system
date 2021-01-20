/* Express建立服务器 */
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const passport = require("passport");
const users = require("./routers/apis/users");

const app = express();
// 引入数据库
const db = require("./config/keys").mongoURI;

// 使用body-parse中间件
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


// 链接数据库
mongoose.connect(db).then(
    ()=>console.log("database connected!")
).catch(err=>console.log(err));

// 初始化passport
app.use(passport.initialize());
// 把passport传入passport文件
require("./config/passport")(passport);

app.get("/",(req,res)=>{
    res.send("Hello World!");
});

app.use("/api/users",users);



const port = process.env.PORT || 5000;

app.listen(port, ()=>{
    console.log(`Server is running on port ${port} `);
});