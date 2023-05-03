const mongoose = require('mongoose')


const vmSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter the name of the machine'],
        maxlength: [35, 'maximum character is 15'],
        unique: [true, "Please enter a unique machine name"]
    },
    numberofitems:{
        type: Number,
        required: [true, "Please enter the number of items"],
    },
    items:{
        type: Map,
        required: [true, "Please enter the items"],
      
    },
    city:{
        type: String,
        required: [true, 'Please enter the city of the machine'],
        maxlength: [35, 'maximum character is 15']
    },
    building:{
        type: String,
        required: [true, 'Please enter the building of the machine'],
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