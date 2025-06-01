const User = require("../models/user.model.js");
const Address = require("../models/address.model.js"); // Ensure this path is correct
const mongoose = require("mongoose");

const bcrypt = require('bcrypt');
const jwtProvider = require("../config/jwtProvider.js")
const createUser = async(userData)=>{
    try{
        let {firstName,lastName,email,password } =userData;
          const  isUserExist =await User.findOne({email})
           if(isUserExist){
            throw new Error('user already exist with email :', email)
                       }
               password =await bcrypt.hash(password,8);
               const user =await User.create({firstName,lastName,email,password});
               console.log('created user' ,user)
               return user;
           
} catch(error){
    throw new Error(error.message)
       
}
}




const findUserById = async (userId) => {
    if (!mongoose.Types.ObjectId.isValid(userId)) {
        throw new Error("Invalid user ID format: " + userId);
    }

    const user = await User.findById(userId).populate("address");
    if (!user) {
        throw new Error("user not found with id: " + userId);
    }
    return user;
};
const getUserByEmail = async(email)=>{
    try {

    const user = await User.findOne({email});
        if(!user){
                throw new Error("user not found with email:" + email)


        }
           return user;

        
    } catch (error) {
          throw new Error(error.message)
    }
}




const getUserProfileByToken=async(token)=>{
    try {
        const userId=jwtProvider.getUserIdFromtoken(token);
        const user = await findUserById(userId);
          if(!user){
              if (!user) {
  throw new Error(`user not found with id: ${userId}`);
}



        }
        console.log("user",user )
        return user
        
    } catch (error) {
            throw new Error(error.message)
        
    }
}
const getAllUsers = async()=>{
    try {
        const users = await User.find();
        return users;
    } catch (error) {
        throw new Error(error.message)
    }
}
module.exports ={createUser,findUserById,getUserByEmail,getUserProfileByToken,getAllUsers}