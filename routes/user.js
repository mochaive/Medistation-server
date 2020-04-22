const express = require('express')
const morgan = require('morgan')
const router = express.Router()

const root = "/home/medistation/medistation_server"

router.use(morgan('combined'))

// Models
const User = require(`${root}/models/userModel`)


function asyncWrap(asyncFn) {
    return (async (req, res, next) => {
        try {
            return await asyncFn(req, res, next)
        } catch (error) {
            return next(error)
        }
    })
}



// user login api
router.post('/login', asyncWrap(async (req, res) => {
    
    let id = req.body.id
    let password = req.body.password

    console.log(`id: ${id}, password: ${password}`)

    await User.findOne({
        id,
        password
    }, (err, user) => {
        if(err) res.json({"success": false})
        if(user == null) res.json({"success": false})
        else res.json({"success": true})
    })

}))

// user register api
router.post('/register', asyncWrap(async (req, res) => {
    const user = new User()

    console.log(`regster_id: ${req.body.id}`)

    user.id = req.body.id
    user.password = req.body.password
    user.name = req.body.name
    user.birth = req.body.birth
    user.allergy = req.body.allergy
    user.medicine = req.body.medicine
    user.gender = req.body.gender
    user.pregnant = req.body.pregnant

    user.save((err) => {
        if(err) {
            console.error(err)
            res.json({"success": false})
        }
    })
    
    res.json({"success": true})
}))

// get user info api
router.get('/info/:id', asyncWrap(async (req, res) => {

    let id = req.params.id

    await User.findOne({
        id
    }, (err, user) => {
        if(err) res.json({"success": false})
        if(user == null) res.json({"success": false})
        else res.json(user)
    })

}))

// update user info api
router.put('/info/update/:id', asyncWrap(async (req, res) => {
    
    let id = req.params.id

    User.updateOne({
        id
    }, {
        $set: req.body
    }, (err, output) => {
        // console.log(output)
        if(err) res.json({"success": false})
        else res.json({"success": true})
    })

}))



module.exports = router