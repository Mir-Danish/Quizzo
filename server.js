const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const colors = require("colors");
const morgan = require("morgan");
const connectDB = require("./config/db");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("./models/userDetails");
const Question = require("./models/questionDetail");

{/*const JWT_SECRET = "HSGpaYK@&GS98GS23SnS" */}
//Dotenv
dotenv.config();

//MONGODB Connection
connectDB();


//Rest Object
const app = express()

//middlewares
app.use(cors())
app.use(express.json())
app.use(morgan("dev"))

require("./models/userDetails");



const User=mongoose.model("UserInfo");

app.get("/hell",(req,res)=>{
    res.send({status:"Hello"})
});






// Fetch questions based on category
app.get("/questions/:category", async (req, res) => {
    const { category } = req.params;
    try {
        const questions = await Question.find({ category: category }); // Use the Question model
        if (questions.length === 0) {
            return res.status(404).send({ status: "error", message: "No questions found" });
        }
        res.send({ status: "ok", data: questions });
    } catch (error) {
        console.error("Error fetching questions:", error);
        res.status(500).send({ status: "error", message: "Internal server error" });
    }
});


//REGISTER API
app.post("/register",async(req,res)=>{
    const {name,email,mobile,password} = req.body;
    if(!password || password.length < 6) {
        return res.send({
            success:false,
            data:"password is required and 6 character long"
        })
    }
    const oldUser = await User.findOne({email:email});

    if(oldUser){
        return res.send({ data:"User Already Exists"});  
    }
    const encryptedPassword = await bcrypt.hash(password,10)
    try {
        await User.create({
        name:name,
        email:email,
        mobile,
        password:encryptedPassword
        });
        res.send({status:"ok",data:"User Created"})
    } catch (error) {
        res.send({status:"ok",data: "Erro in Registration"})
    }
})

//LOGIN API
{/*app.post("/login-user",async(req,res)=>{
    const {email,password} = req.body;
    const oldUser = await User.findOne({email:email});

    if(!oldUser){
        return res.send({data: "User Doesn't Exist!"})
    }

    if(await bcrypt.compare(password,oldUser.password)){
    
    //const token = jwt.sign({ _id: oldUser._id }, process.env.JWT_SECRET, {
       // expiresIn: "7d"
    //});
    
       const token= await jwt.sign({email:oldUser.email},JWT_SECRET);

    if(res.status(201)){
        return res.send({status:"ok",data:token,
        oldUser, });
    } else{
        return res.send({error:"error"});
    }
    }
});


app.post("/userdata", async(req,res)=>{
    const {token} = req.body;
    try {
        const user = jwt.verify(token,JWT_SECRET)
        const userEmail = user.email;

        user.findOne({email:userEmail}).then((data)=>{
            return res.send({status:"ok",data: data})
        })
    } catch (error) {
        return res.send({error:"error"})
    }
})
*/}

app.post("/login-user", async (req, res) => {
    const { email, password } = req.body;
    const oldUser = await User.findOne({ email: email });

    if (!oldUser) {
        return res.send({ data: "User Doesn't Exist!" });
    }

    if (await bcrypt.compare(password, oldUser.password)) {
        const token = await jwt.sign({ email: oldUser.email }, process.env.JWT_SECRET);
        // Removed the incorrect status check
        return res.send({ status: "ok", data: token, oldUser });
    } else {
        return res.send({ error: "Invalid password" }); // Handle invalid password case
    }
});




app.post("/userdata", async (req, res) => {
    const { token } = req.body;
    try {
        // Verify the token
        const user = jwt.verify(token, process.env.JWT_SECRET);
        const userEmail = user.email; // Extract email from token

        // Use async/await to find the user
        const userData = await User.findOne({ email: userEmail });

        if (!userData) {
            return res.status(404).send({ status: "error", message: "User not found" });
        }

        console.log("User data fetched:", userData);
        return res.send({ status: "ok", data: userData });
    } catch (error) {
        console.error("Token verification error:", error);
        return res.status(401).send({ status: "error", message: "Invalid token" }); // More specific error message
    }
});





// Fetch questions based on category
app.get("/questions/:category", async (req, res) => {
    const { category } = req.params;
    try {
        const questions = await Question.find({ category: category });
        if (questions.length === 0) {
            return res.status(404).send({ status: "error", message: "No questions found" });
        }
        res.send({ status: "ok", data: questions });
    } catch (error) {
        console.error("Questions are not availbale", error);
        res.status(500).send({ status: "error", message: "Internal server error" });
    }
});




app.listen(8040, ()=>{
    console.log("Node js server is Started")
})

{/*//ROUTES
app.use("/api/v1/auth",require("./routes/userRoutes"));

//PORT
const PORT = process.env.PORT || 8040

app.get("/hell",(req,res) =>{
    res.send({
        status:"hello there"
    })
})
//LISTEN
app.listen(PORT,()=>{
    console.log(`Server Runing on ${PORT}`.bgGreen.white);
});*/}
