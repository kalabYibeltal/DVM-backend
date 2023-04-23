const { ObjectId } = require('bson')
const mongoose = require('mongoose')

// interface item {
//     name
//     count
// } 

const vmSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter the name of your car'],
        maxlength: [15, 'maximum character is 15']
    },
    id:{
        type: String,
        required: [true, 'Please enter the plate number'],
        length: 6
    },
    items:{
        type: List,
        required: [true, "Please enter the car model"],
      
    },
    
})

const Vm = mongoose.model('vm', vmSchema)
module.exports = Vm