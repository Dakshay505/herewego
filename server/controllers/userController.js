const User = require('../model/userModel');
const bcrypt = require('bcrypt');
// Register new user
module.exports.register =async (req,resp,next)=>{
    try{
   const {userName ,userEmail,userPassword ,}=req.body;
   const isUserName = await User.findOne({userName:userName})
   if(isUserName){
    return resp.json({
        status:false,
        message:"user Name already exist, try new one."
    })}
   const isUserEmail = await User.findOne({userEmail:userEmail})
   if(isUserEmail){
    return resp.json({
        status:false,
        message:"Email already exist, try new one."
    })
   }
   const hashPassword = await bcrypt.hash(userPassword,10);
   const user = await User.create({
    userName,
    userEmail,
    userPassword:hashPassword
   })
   return resp.json({
    status:true,
    message:"user created",
    user
   })
  } catch(err){
    next(err)
}
}
// login 
module.exports.login =async (req,resp,next)=>{
    try{
   const {userEmail,userPassword}=req.body;
   const isUserEmail = await User.findOne({userEmail:userEmail})
   if(!isUserEmail){
    return resp.json({
        status:false,
        message:"Email or password does't match."
    })
   }
   if(isUserEmail){
    const user = await User.findOne({userEmail:userEmail})
     if(await bcrypt.compare(userPassword,user.userPassword)){
        return resp.json({
            status:true,
            message:"logged in successfully",
            user
           })
     }else{
        return resp.json({
            status:false,
            message:"Email or password does't match."
        })
     }
   }
  } catch(err){
    next(err)
}
}
// setAvatar
module.exports.setAvatar = async (req,resp,next)=>{
    try{
        const name = req.params.name;
        const image = req.body.image;
        // console.log(id);
        // const userr = await User.findById(id);
        // console.log(userr);
        
        const user = await User.findOneAndUpdate({userName:name},{
            isAvatar:true,
            avatarImage:image
        })
        // console.log(user)
        return resp.json({
            status:true,
            isAvatar:true,
            user
        })
        

    }catch(err){
        next(err);
    }
}
// geting contact info
module.exports.allUsers = async (req,resp,next)=>{
    try{
        const users = await User.find({_id:{$ne:req.params.id}}).select([
            "userName","userEmail","_id","avatarImage"
        ]);
        resp.json({success:true
            ,users});

    }catch (err){
        next(err)
    }
}