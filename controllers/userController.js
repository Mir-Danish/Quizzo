const JWT = require("jsonwebtoken")

const { hashPassword, comparePassword } = require("../helpers/authHelper");
const userModel = require("../models/userModel")

const registerController = async (req,res) => {
    try {
        const {name,email,password}  = req.body
        //validation
        if(!name) {
            return res.status(400).send({
                success:false,
                message:"name is required"
            })
        }
        if(!email) {
            return res.status(400).send({
                success:false,
                message:"email is required"
            })
        }
        if(!password || password.length < 6) {
            return res.status(400).send({
                success:false,
                message:"password is required and 6 character long"
            })
        }

        //existing user 
        const existingUser = await userModel.findOne({email})
        if(existingUser){
            return res.status(500).send({
                success:false,
                message:"User Already Registered with this email"
            });
        };

        //hashed password
        const hashedPassword = await hashPassword(password);

        //save user
        const user = await userModel({
            name,
            email,
            password:hashedPassword
        }).save();
        
        return res.status(201).send({
            success:true,
            message:"Registration Successfully please login"
        })
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success:false,
            message:"Error in Registration",
            error,
        });
    }
};


//Login Controller
const loginController = async (req,res) =>{
    try {
        const {email,password} = req.body
        //validation
        if(!email){
            return res.status(500).send({
                success:false,
                message:"Please Provide Email Address"
            })
        }
        if(!password){
            return res.status(500).send({
                success:false,
                message:"Please Provide the password"
            })
        }
        //find User
        const user = await userModel.findOne({email})
        if(!user){
            return res.status(500).send({
                success:false,
                message:"User Not Found!"
            })
        }

        //match password
        const match = await comparePassword(password, user.password)
        if(!match){
            return res.status(500).send({
                success:false,
                message:"Invalid username or password"
            })
        }
        //TOKEN JWT
        const token = await JWT.sign({_id:user._id}, process.env.JWT_SECRET, {
            expiresIn:"7d"
        })


        //undefined password
        user.password = undefined;

        res.status(200).send({
            success:true,
            message:"Login Successfully",
            token,
            user,
        });
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success:false,
            message:"Error in Login",
            error
        })
    }
}
module.exports  = {registerController, loginController}