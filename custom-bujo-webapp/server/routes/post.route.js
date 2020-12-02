const express = require('express');
const postRoute = express.Router();

let PostModel = require('../models/Post')

//index
postRoute.route('/').get((req, res) => {
    PostModel.find((error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
})


//create details
postRoute.route('/create-post').post((req, res, next) => {
    PostModel.create(req.body, (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
})

//update details
postRoute.route('/update-post/:id').post((req, res, next) => {
        PostModel.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, (error, data) => {
            if (error) {
                return next(error);
            } else {
                res.json(data)
                console.log('Updated!')
            }
        })
    })

// delete details
postRoute.route('/delete-post/:id').delete((req, res, next) => {

    PostModel.findByIdAndRemove(req.params.id, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.status(200).json({
                msg: data
            })
        }
    })

})
module.exports = postRoute;