const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userModel = require("../models/loginSchema");
const { validationResult } = require("express-validator");
const fs = require("fs");
class Login {
  async login(req, res) {
    const errors = validationResult(req);
    if (errors.array().length) {
      res.status(422).json({ validationError: errors.array() });
    } else {
      let isUserExist = await userModel.findOne({ phone: req.body.phone });

      if (isUserExist) {
        const obj = {
          ...req.body,
          user_name: isUserExist.user_name,
        };
        if (bcrypt.compareSync(req.body.password, isUserExist.password)) {
          const token = jwt.sign(obj, process.env.SECRET_KEY);
          
          // req.userToken = token
          res.status(200).json({
            status: 1,
            token: token,
            userId: isUserExist._id,
            name: isUserExist.name,
            message: "Login successful",
          });
        } else {
          res
            .status(401)
            .json({ status: 0, message: "Credentials does not match" });
        }
      } else {
        res
          .status(401)
          .json({ status: 0, message: "Credentials does not match" });
      }
    }
  }
  async verifyToken(req, res) {
    res.status(200).json({ message: "Verified access", status: 1 });
  }
  async getMyInfo(req, res) {
    let userDetails = await userModel.findOne({ user_name: req.user_name });
    if (userDetails) {
      console.log("userdetails", userDetails);
      res.status(200).json({ MyInfo: userDetails });
    } else {
      res.status(500).json({ message: "Error in fetching info" });
    }
  }

  async updateInfo(req, res) {
    console.log("body", req.body);
    // console.log("req.file", req.file);
    const errors = validationResult(req);
    let ImageError = req.uploadErr;
    let validationError = errors.array()
    if(ImageError){
      validationError.push({path:'image',msg:ImageError})
    }
    
    console.log("validationError", validationError);
    
    if(!validationError.length){
        let userDetails = await userModel.findOne({ user_name: req.user_name });
        function updateImage() {
          if(userDetails.image){
            fs.unlinkSync(`public/img/${userDetails.image}`);
          }
          
          return req.file.filename;
        }
        let obj = {
          ...req.body,
          password:
            req.body.password === ""
              ? userDetails.password
              : bcrypt.hashSync(req.body.password, 10),
          image: req.file ? updateImage() : userDetails.image,
        };
        userModel
          .findOneAndUpdate({ _id: userDetails._id }, obj)
          .then(() => {
            res
              .status(200)
              .json({ message: "Profile updated successfully", status: 1 });
          })
          .catch((err) => {
            res.status(500).json({
              message: "Falied to update profile",
              status: 0,
              Error: err,
            });
          });
    }
    else{
        // if(ImageError){
        //     errors.array().push(ImageError)
        // }
        res.status(422).json({ validationError: validationError });
    }
  }
}
module.exports = new Login();
