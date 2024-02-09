const mongoose = require('mongoose')
const userModel = require('../models/loginSchema')
const giveaskModel = require('../models/giveAndAskSchema')
const { validationResult } = require("express-validator");

class GiveAsk {

    async createNeed(req, res) {

        const errors = validationResult(req);
        if (errors.array().length) {
            console.log('form if');
            res.status(422).json({ validationError: errors.array() })
        } else {
            console.log('body', req.body);
            let userDetails = await userModel.findOne({ user_name: req.user_name })
            if (req.body.give) {
                let giveObj = {
                    user_id: userDetails._id,
                    give: req.body.give
                }
                let data = await giveaskModel.create(giveObj)
                if (data._id) {
                    res.status(200).json({ message: 'Giveable created successfully', status: 1 })
                } else {
                    res.status(500).json({ message: 'Failed to create giveable', status: 0 })
                }
            }
            else if (req.body.ask) {
                let askObj = {
                    user_id: userDetails._id,
                    ask: req.body.ask
                }
                let data = await giveaskModel.create(askObj)
                if (data._id) {
                    res.status(200).json({ message: 'Requirement created successfully', status: 1 })
                } else {
                    res.status(500).json({ message: 'Failed to create requirement', status: 0 })
                }
            }
        }
    }

    async fetchGiveAsk(req, res) {
        console.log('hello');
        giveaskModel.aggregate([
            {
                $lookup: {
                    from: 'User',
                    localField: 'user_id',
                    foreignField: '_id',
                    pipeline: [
                        {
                            $project: {
                                user_name: 1
                            }
                        }
                    ],
                    as: 'userdetails'
                }
            }
        ]).then((data) => {
            console.log('data', data);
            res.status(200).json({ details: data })
        }).catch((err) => {
            console.log(err);
            res.status(500).json({ message: 'Unable to fetch details', Error: err })
        })
    }

    async matches(req, res) {

        let user = await userModel.findOne({ user_name: req.user_name })
        let mygiveask = await giveaskModel.find({ user_id: user._id })
        // console.log('giveask',giveask);
        let myAsk = mygiveask
            .filter(x => x.ask) // Filter out objects where 'x.give' is not present or falsy
            .map((x) => (x.ask));
        console.log('myAsk', myAsk);
        let matchesFound = []
        await Promise.all(
            myAsk.map(async (x) => {
                let result = await giveaskModel.aggregate([
                    {
                        $match: {
                            user_id: { $ne: user._id },
                            give: x
                        }
                    },
                    {
                        $lookup: {
                            from: 'User',
                            localField: 'user_id',
                            foreignField: '_id',
                            pipeline: [
                                {
                                    $project: {
                                        user_name: 1,
                                        mail: 1
                                    }
                                }
                            ],
                            as: 'userdetails'
                        }
                    },
                    
                    
                ])
                matchesFound.push(result)
            })
        )

        console.log('matchesFound', matchesFound);
        res.status(200).json({ matchesFound: matchesFound })
    }

}
module.exports = new GiveAsk()