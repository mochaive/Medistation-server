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


// push medicine info api
router.post("/medicine", (req, res) => {
    
    const medicine = new Medicine()

    medicine.id = req.body.id
    medicine.name = req.body.name
    medicine.shape = req.body.shape
    medicine.company = req.body.company
    medicine.store = req.body.store
    medicine.symptom = req.body.symptom
    medicine.takeInfo = req.body.takeInfo
    medicine.how = req.body.how
    medicine.caution = req.body.caution

    medicine.save((err) => {
        if(err) {
            console.error(err)
            res.json({"success": false})
        }
    })
    
    res.json({"success": true})
})


// update medicine info api
router.put("/medicine/update/:name", asyncWrap(async (req, res) => {

    let name = req.params.name

    Medicine.updateOne({
        name
    }, {
        $set: req.body
    }, (err, output) => {
        // console.log(output)
        if(err) res.json({"success": false})
        else res.json({"success": true})
    })

}))





module.exports = router