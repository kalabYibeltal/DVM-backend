const mongoose = require('mongoose')


const buildSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    location:{
        type: String,
    }, 
    longitude:{
        type: Number,
    }, 
    latitude:{
        type: Number,
    },    
    profit: {
        type: Number,
    }
})


const Build = mongoose.model('build', buildSchema)
module.exports = Build