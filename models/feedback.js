const mongoose = require('mongoose')


const fbSchema = new mongoose.Schema({
    rating: {
        type: Number,
    },
    feedback:{
        type: String,
    },    
})


const Fb = mongoose.model('fb', fbSchema)
module.exports = Fb