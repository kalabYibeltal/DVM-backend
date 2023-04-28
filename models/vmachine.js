const mongoose = require('mongoose')


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
    city:{
        type: String,
        required: [true, 'Please enter the name of your car'],
        maxlength: [35, 'maximum character is 15']
    },
    building:{
        type: String,
        required: [true, 'Please enter the name of your car'],
        maxlength: [35, 'maximum character is 15']
    },
    income:{
        type: Number
    },
    
})

vmSchema.statics.login = async function(name) {
    const machine = await this.findOne({ name })
    
    if (machine){
        return machine
    }
    throw Error('Unregisterd Vending Machine')
}


const Vm = mongoose.model('vm', vmSchema)
module.exports = Vm