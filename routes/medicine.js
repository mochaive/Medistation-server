const express = require('express')
const morgan = require('morgan')
const router = express.Router()

const root = "/home/medistation/medistation_server"

router.use(morgan('combined'))

const Medicine = require(`${root}/models/medicineModel`)


function asyncWrap(asyncFn) {
    return (async (req, res, next) => {
        try {
            return await asyncFn(req, res, next)
        } catch (error) {
            return next(error)
        }
    })
}

router.get('/info/:id', asyncWrap(async (req, res) => {
    let id = req.params.id

    await Medicine.findOne({
        id
    }, (err, medicine) => {
        if(err) res.json({"success": false})
        if(medicine == null) res.json({"success": false})
        else res.json(medicine)
    })
}))





module.exports = router