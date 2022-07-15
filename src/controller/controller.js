const User = require("../models/models");
const sendEmail = require("../utils/mailer");

//    create user
exports.registerUser = async(req,res,next)=>{
    const {name,phone, email,hobbies} = req.body;
    
    // if(!name || !phone || !email || !hobbies){
    //     res.status(404).json({message: "plZ fill all data..", success: false})
    // }
    try {
        const user = await User.findOne({email: email});

        // console.log(user);
        if(user){
            res.status(404).json({message : "User already exist", success: false})
        }else{
    
            const use = await User.create({
                name,phone, email,hobbies,   
            });
            res.status(201).json({
                message : "User Added",
                success : true,
            })
        }
    } catch (error) {
        res.status(400).json({message : error.message, success: false})
    }

    
    
};

//      get all users details
exports.getUsers = async(req,res,next)=>{
    try {
        const users = await User.find();
        
        res.status(200).json({
            success: true,
            users
        })

    } catch (error) {
        res.status(400).json({message: error.message})
    }
};

//   get single user details

exports.singleUser = async(req,res)=>{
    try {
        console.log(req.params.id)
        const user = await User.findById(req.params.id);

        if(!user){
            res.status(400).json({message: "user not found"})
        }

        res.status(200).json({
            success : true,
            user
        }
        )
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}

///    update user
exports.updateUser = async(req,res,next)=>{
    const newUserData = {
        name:req.body.name,
        phone:req.body.phone,
        email:req.body.email,
        hobbies:req.body.hobbies,
    }

    try {
        const user = await User.findById(req.params.id);
        if(!user){
            res.status(404).json({message: "user not found", success: false})
        }
    
        const updatedUser = await User.findByIdAndUpdate(req.params.id, newUserData,{
            new: true,
            runValidators: true,
            userFindAndModify: false,
        });
    
        res.status(201).json({
            message: "User details Updated",
            success : true,
        })
        
    } catch (error) {
        res.status(404).json({message: error.message, success:false})
    }

};


//     delete user
exports.deleteUser = async(req,res,next)=>{
    try {
        const user = await User.findById(req.params.id);
        if(!user){
            res.status(400).json({message: "user not found"})
        }
        const remove = await User.findByIdAndDelete(req.params.id);
            
        res.status(200).json({
            message : "User Deleted",
            success : true,
        })
        
    } catch (error) {
        res.status(400).json({message: error.message})
    }

};

//  send user to mail....
exports.sendUsersData = async(req,res,next)=>{

    const message = JSON.stringify(req.body);

    console.log(message)

    try {
        
        await sendEmail({
            email: "sanjayprajapati68149@gmail.com",
            subject: `send data of selected user`,
            message: message,
        });
        res.status(200).json({
            success: true,
            message: `email sent successfully`,
        })
    }catch(error){
        res.status(400).json({
            success: false,
            message : error.message,
        }) 
    }
};
