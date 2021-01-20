const mongoose = require("mongoose");
const schema = mongoose.Schema;

// 创建用户数据库的 Schema
const UserSchema = new mongoose.Schema({
    name:{
        type: String,
        required:true
    },
    email:{
        type: String,
        required:true
    },
    password:{
        type: String,
        required:true
    },
    avatar:{
        type: String,
        required:true
    },
    date:{
        type: Date,
        default: Date.now
    },
});

module.exports = User = mongoose.model("users", UserSchema);