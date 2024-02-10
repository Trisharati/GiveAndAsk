const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const userModel = require('../models/loginSchema')
const { validationResult } = require("express-validator");
class Login{
    
    async login(req,res){
       
        const errors = validationResult(req);
        if(errors.array().length){
            res.status(422).json({validationError:errors.array()})
        }else{
            let isUserExist = await userModel.findOne({user_name:req.body.user_name})
            
            if(isUserExist){
                if(bcrypt.compareSync(req.body.password,isUserExist.password)){
                    const token = jwt.sign(req.body,process.env.SECRET_KEY,
                        {
                            expiresIn:'30m'
                        })
                        req.userToken = token
                    res.status(200).json({status:1,token:token,
                        user_name:isUserExist.user_name,message:'Login successful'})
                }else{
                    res.status(401).json({status:0,message:'Credentials does not match'})
                }
            }else{
                res.status(401).json({status:0,message:'Credentials does not match'})
            }
            
        }
    }
async verifyToken(req,res){
    res.status(200).json({message:'Verified access',status:1})
}
    async getMyInfo(req,res){
        let userDetails = await userModel.findOne({user_name:req.user_name})
        if(userDetails){
            res.status(200).json({MyInfo:userDetails})
        }
        else{
            res.status(500).json({message:'Error in fetching info'})
        }
    }

async updateInfo(req,res){
    console.log('body',req.body);
    const errors = validationResult(req);
    console.log('errors',errors.array());
    if(errors.array().length){
        res.status(422).json({validationError:errors.array()})
    }else{
        let userDetails = await userModel.findOne({user_name:req.user_name})
        let obj={
            ...req.body,
            password:req.body.password===''?userDetails.password:bcrypt.hashSync(req.body.password,10)
        }
        userModel.findOneAndUpdate({_id:userDetails._id},obj)
        .then(()=>{
            res.status(200).json({message:'Profile updated successfully',status:1})
        }).catch((err)=>{
            res.status(500).json({message:'Falied to update profile',status:0,Error:err})
        })
    }
}

}
module.exports = new Login()