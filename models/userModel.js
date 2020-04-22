const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({

    id: String,
    password: String,
    name: String,
    birth: String,
    allergy: Array,
    medicine: Array,
    gender: String,
    pregnant: Boolean

})

/* JSON example
{
	"id": "test",
	"password": "test",
	"name": "test",
	"birth": "20021107",
	"allergy": null,
	"medicine": null,
	"gender": "0",
	"pregnant": true
}
*/

module.exports = mongoose.model('user', userSchema)