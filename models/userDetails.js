const mongoose = require("mongoose");

const userDetailSchema = new mongoose.Schema({
    name:String,
    email:{ type:String,unique:true },
    mobile:String,
    password:String
},{
    collection:"UserInfo",
    timestamps:true
});

mongoose.model("UserInfo", userDetailSchema);