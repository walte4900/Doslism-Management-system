/* Express建立服务器 */
const express = require('express');
const mongoose = require('mongoose');
const app = express();

// 引入数据库
const db = require("./config/keys").mongoURI;
// 链接数据库
mongoose.connect(db).then(
    ()=>console.log("database connected!")
).catch(err=>console.log(err));

app.get("/",(req,res)=>{
    res.send("Hello World!");
});

const port = process.env.PORT || 5000;

app.listen(port, ()=>{
    console.log(`Server is running on port ${port} `);
});