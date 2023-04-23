
const mongoose = require('mongoose')

// interface item {
//     name
//     count
// } 

const vmSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter the name of your car'],
        maxlength: [35, 'maximum character is 15']
    },
    numberofitems:{
        type: Number
    },
    items:{
        type: Map,
        required: [true, "Please enter the car model"],
      
    },
    
})

const Vm = mongoose.model('vm', vmSchema)
module.exports = Vm