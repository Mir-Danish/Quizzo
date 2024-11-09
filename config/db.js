const mongoose = require("mongoose")
const colors = require("colors")

const connectDB = async () =>{
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log(`Connecteed to Database ${mongoose.connection.host}`.bgCyan.white);
    } catch (error) {
      console.log(`Error in connection DB ${error}`.bgCyan.white)  
    }
}

module.exports = connectDB;