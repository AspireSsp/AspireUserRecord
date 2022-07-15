const mongoose = require("mongoose");
const validator = require("validator");


const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please Enter Your Name"],
        
    },
    phone:{
        type:String,
        required:[true,"Please Enter Your Number"],
        maxlength:[10,"Number cannot exceed 10 digite"],
        minlength:[10,"Number cannot less then 10 digite"]
    },
    email:{
        type:String,
        required:[true,"Please Enter Your Email"],
        unique:true,
        validate:[validator.isEmail, "Please Enter a valid Email"]
    },
    hobbies:{
        type:String,
        required:[true,"Please Enter Your Hobbies"],
    },
    
    

});


module.exports= mongoose.model("user", userSchema);