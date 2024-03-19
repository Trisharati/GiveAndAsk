const mongoose = require("mongoose");
const userModel = require("../models/loginSchema");
const giveaskModel = require("../models/giveAndAskSchema");
const { validationResult } = require("express-validator");
// let nodemailer = require('nodemailer');

class GiveAsk {
  async createNeed(req, res) {
    const errors = validationResult(req);
    if (errors.array().length) {
      console.log("form if");
      res.status(422).json({ validationError: errors.array() });
    } else {
      // console.log("body", req.body);
      let userDetails = await userModel.findOne({ _id: req.userId });
      if (req.body.give) {
        let giveObj = {
          user_id: userDetails._id,
          give: req.body.give.trim(),
        };
        let data = await giveaskModel.create(giveObj);
        if (data._id) {
          // var transporter = nodemailer.createTransport({
          //     service: 'gmail',
          //     auth: {
          //         user: 'intellectualautumn@gmail.com',
          //         pass: 'Ams.terdam6'
          //     }
          // });

          // var mailOptions = {
          //     from: 'intellectualautumn@gmail.com',
          //     to: 'webdevarisu3@gmail.com',
          //     subject: 'Sending Email using Node.js',
          //     text: 'That was easy!'
          // };

          // transporter.sendMail(mailOptions, function (error, info) {
          //     if (error) {
          //         console.log(error);
          //     } else {
          //         console.log('Email sent: ' + info.response);
          //     }
          // });
          res
            .status(200)
            .json({ message: "Giveable created successfully", status: 1 });
        } else {
          res
            .status(500)
            .json({ message: "Failed to create giveable", status: 0 });
        }
      } else if (req.body.ask) {
        let askObj = {
          user_id: userDetails._id,
          ask: req.body.ask.trim(),
        };
        let data = await giveaskModel.create(askObj);
        if (data._id) {
          res
            .status(200)
            .json({ message: "Requirement created successfully", status: 1 });
        } else {
          res
            .status(500)
            .json({ message: "Failed to create requirement", status: 0 });
        }
      }
    }
  }

  async fetchGiveAsk(req, res) {
    console.log("hello");
    giveaskModel
      .aggregate([
        {
          $lookup: {
            from: "User",
            localField: "user_id",
            foreignField: "_id",
            pipeline: [
              {
                $project: {
                  name: 1,
                },
              },
            ],
            as: "userdetails",
          },
        },
      ])
      .then((data) => {
        console.log("data", data);
        res.status(200).json({ details: data });
      })
      .catch((err) => {
        console.log(err);
        res
          .status(500)
          .json({ message: "Unable to fetch details", Error: err });
      });
  }

  async myGive(req, res) {
    // console.log('req.params.userId',req.params.userId);
    let MyGiveAsk = await giveaskModel.find({ user_id: req.params.userId });
    let mygives = await MyGiveAsk.filter((x) => {
      return x.give;
    });
    console.log("mygives", mygives);
    res.status(200).json({ MyGives: mygives });
  }

  async fetchSingleGive(req, res) {
    giveaskModel
      .findOne({ user_id: req.params.userId, _id: req.params.giveId })
      .then((data) => {
        console.log("edit give", data);
        res.status(200).json({ editGive: data });
      })
      .catch((err) => {
        res.status(500).json({ error: err });
      });
  }

  async updateMyGive(req, res) {
    // console.log("body", req.body);
    giveaskModel
      .findOneAndUpdate(
        { user_id: req.params.userId, _id: req.params.giveId },
        { ...req.body }
      )
      .then(() => {
        res.status(200).json({ message: "Updated Successfully", status: 1 });
      })
      .catch((err) => {
        res.status(500).json({ message: "Failed to update" });
      });
  }

  async deleteMyGive(req, res) {
    giveaskModel
      .findOneAndDelete({ user_id: req.params.userId, _id: req.params.giveId })
      .then(() => {
        res.status(200).json({ message: "Deleted successfully", status: 1 });
      })
      .catch((err) => {
        res.status(500).json({ message: "Failed to delete", err });
      });
  }

  async myAsk(req, res) {
    // console.log("req.params.userId", req.params.userId);
    let MyGiveAsk = await giveaskModel.find({ user_id: req.params.userId });
    let myasks = await MyGiveAsk.filter((x) => {
      return x.ask;
    });
    console.log("my asks", myasks);
    res.status(200).json({ MyAsks: myasks });
  }

  async fetchSingleAsk(req, res) {
    // console.log("askid", req.params.askId);
    giveaskModel
      .findOne({ user_id: req.params.userId, _id: req.params.askId })
      .then((data) => {
        console.log("edit ask", data);
        res.status(200).json({ editAsk: data });
      })
      .catch((err) => {
        res.status(500).json({ error: err });
      });
  }

  async updateMyAsk(req, res) {
    // console.log("body", req.body);
    giveaskModel
      .findOneAndUpdate(
        { user_id: req.params.userId, _id: req.params.askId },
        { ...req.body }
      )
      .then(() => {
        res.status(200).json({ message: "Updated Successfully", status: 1 });
      })
      .catch((err) => {
        res.status(500).json({ message: "Failed to update" });
      });
  }

  async deleteMyAsk(req, res) {
    giveaskModel
      .findOneAndDelete({ user_id: req.params.userId, _id: req.params.askId })
      .then(() => {
        res.status(200).json({ message: "Deleted successfully", status: 1 });
      })
      .catch((err) => {
        res.status(500).json({ message: "Failed to delete", err });
      });
  }


  async matches(req, res) {
    let user = await userModel.findOne({ _id: req.userId });
    let mygiveask = await giveaskModel.find({ user_id: user._id });
    // console.log('giveask',giveask);
    let myAsk = mygiveask
      .filter((x) => x.ask) // Filter out objects where 'x.give' is not present or falsy
      .map((x) => x.ask);
    console.log("myAsk", myAsk);
    let matchesFound = [];
    await Promise.all(
      myAsk.map(async (x) => {
        let result = await giveaskModel.aggregate([
          {
            $match: {
              user_id: { $ne: user._id },
              // give: { $regex: new RegExp(x, 'i') }
              give: x,
            },
          },
          {
            $lookup: {
              from: "User",
              localField: "user_id",
              foreignField: "_id",
              pipeline: [
                {
                  $project: {
                    name: 1,
                    mail: 1,
                  },
                },
              ],
              as: "userdetails",
            },
          },
        ]);
        matchesFound.push(result);
      })
    );

    console.log("matchesFound", matchesFound);
    res.status(200).json({ matchesFound: matchesFound });
  }
}
module.exports = new GiveAsk();
