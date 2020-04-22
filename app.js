const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const http = require('http')
const WebSocket = require('ws')
const fs = require('fs')
const ipfilter = require('express-ipfilter').IpFilter
const StringBuilder = require('node-stringbuilder')

const app = express()

const ips = ['47.245.28.2']
app.use(ipfilter(ips))

const userRouter = require('./routes/user')
const manageRouter = require('./routes/manage')
const medicineRouter = require('./routes/medicine')


const Medicine = require(`${__dirname}/models/medicineModel`)


app.use(morgan('combined'))
app.use(express.json())


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))


// create server
http.createServer(app).listen(80 || 80)
const wss = new WebSocket.Server({
    port: 8080
})

// Socket server
const sockets = {}
wss.on('connection', function connection(ws, req) {
    const id = req.url.slice(1)
    sockets[id] = ws

    console.log('SOCKET CONNECTED. ID:' + id)

    ws.on('message', function incoming(message) {
        console.log('received: %s', message)
    })

    ws.on('close', () => {
        delete sockets[id]
        console.log('SOCKET DISCONNECTED. ID:' + id)
    })
})

// mongoDB connect
var db = mongoose.connection
db.on('error', console.error)
db.once('open', function () {
    console.log("Connected to mongod server")
})
mongoose.connect('mongodb://localhost/medistation', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})


app.use('/user', userRouter)
app.use('/manage', manageRouter)
app.use('/medicine', medicineRouter)


function asyncWrap(asyncFn) {
    return (async (req, res, next) => {
        try {
            return await asyncFn(req, res, next)
        } catch (error) {
            return next(error)
        }
    })
}


const timeout = ms => new Promise(res => setTimeout(res, ms))



// send email to raspbian
app.post('/berry/send', asyncWrap(async (req, res) => {

    let id = req.body.id
    let uid = req.body.uid.toLowerCase()

    console.log(uid)

    // sockets["04f7b74ae64c80"].send(id)

    // sockets[uid].send(id)

    
    const data = new StringBuilder()
    data.append(`{"success": true, "eatable": true, "id": "0108806538052816"}`)


    fs.writeFileSync(`diagnose.txt`, data.toString(), 'utf8')

    await timeout(1000)

    console.log("Start")

    let temp = ""
    while(true) {
        try{
            temp = fs.readFileSync(`${__dirname}/diagnose.txt`, "utf8");
            console.log("get file")
            break
        } catch(err) {
            await timeout(100)
            continue
        }
    }


    obj = JSON.parse(temp)
    await timeout(100)

   

    fs.unlink(`${__dirname}/diagnose.txt`, function(err) {
        if( err ) throw err;
        console.log('file deleted');
    })

    res.json(obj)

}))

// send medicine id, id
app.post('/compare', asyncWrap(async (req, res) => {

    let id_medicine = req.body.id_medicine
    let id_user = req.body.id_user

    console.log(`id_medicine : ${id_medicine}, id_user : ${id_user}`)

    const data = new StringBuilder()

    let eatable = true

    // await Medicine.findOne({
    //     id: id_medicine
    // }, (err, medicine) => {
    //     if(err) data.append(`{"success": false, "eatable": false, "id": null}`)
    //     else if(medicine == null) data.append(`{"success": false, "eatable": false, "id": null}`)
    //     else {
    //         medicine.caution.forEach(element => {
    //             console.log(element)
    //             if(element.keyword == "임산부") {
    //                 eatable = false
    //                 data.append(`{"success": true, "eatable": false, "id": "${id_medicine}"}`)
    //             }
    //         })
    //     }
    // })

    // if(data.toString() == "") {
    //     data.append(`{"success": true, "eatable": true, "id": "${id_medicine}"}`)
    // }
    // console.log(data.toString())

    // data.append(`{"success": true, "eatable": true, "id": "${id_medicine}"}`)
    console.log('write file success')

    res.json({"eatable": eatable, "id": id_medicine})

}))


app.post('/test', asyncWrap(async (req, res) => {

    let id_medicine = req.body.id_medicine
    let id_user = req.body.id_user

    console.log(`id_medicine : ${id_medicine}, id_user : ${id_user}`)

    const data = new StringBuilder()

    let eatable = true

    await Medicine.findOne({
        id: id_medicine
    }, (err, medicine) => {
        if(err) data.append(`{"success": false, "eatable": false, "id": null}`)
        else if(medicine == null) data.append(`{"success": false, "eatable": false, "id": null}`)
        else {
            medicine.caution.forEach(element => {
                console.log(element)
                if(element.keyword == "임산부") {
                    eatable = false
                    data.append(`{"success": true, "eatable": false, "id": "${id_medicine}"}`)
                }
            })
        }
    })

    if(data.toString() == "") {
        data.append(`{"success": true, "eatable": true, "id": "${id_medicine}"}`)
    }
    console.log(data.toString())
    
    fs.writeFileSync(`diagnose.txt`, data.toString(), 'utf8')
    console.log('write file success')

    res.json({"eatable": eatable, "id": id_medicine})

}))



app.get('/', (req, res) => {
    res.send('medistation server')
})