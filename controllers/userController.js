const User = require('../models/user')
const jwt = require('jsonwebtoken')

//handle errors
const handleErrors = (err)=>{

    let error = {name: "", email: "", password: ""}

    //handles registered email
    if (err.code === 11000){
        error.email = "That email is already registered"
        return error
    }
    //if the input violates the validations
    // console.log(err.message, err.code)
    if (err.message === 'incorrect email'){
        error.email = 'That email is not registered'
    }
    if (err.message === 'incorrect password'){
        error.password = 'That password is incorrect'
    }
    if (err.message.includes('user validation failed')){
        Object.values(err.errors).forEach(({properties}) => {
            //properties.path=email and properties.message='the message displayed'
            error[properties.path] = properties.message
        })
    }
    return error
}

//create token
const maxAge = 3 * 24 * 60 * 60
const createToken = (id)=>{
    return jwt.sign({ id }, 'machine secret', {
        expiresIn: maxAge
    })
}

module.exports.signup_post = async (req, res)=>{
    const {name,email, password, phoneNumber} = req.body;
    // initialize with zero balance
    const balance = 0;
    
    try{
        const user = await User.create({ name,email, password, phoneNumber, balance})
        //add the session key here
        res.status(201).json({ user: user })

    }catch(err){
        const errors = handleErrors(err)
        res.status(400).json({errors})
        // console.log(err)
    }
}

module.exports.login_post = async (req, res)=>{
    const {email, password} = req.body

    try{
        const user = await User.login(email, password)
        const token = createToken(user._id)

        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 })
        res.status(200).json({ token: token, user: user})
    }catch(err){
        console.log(err)
        const errors = handleErrors(err)
        res.status(400).json({ errors })
        
    }
}

module.exports.balance_get = (req, res) =>{
    User.findById(req.params.id)
        .then((result)=>{
            res.status(201).json(result)
        })
        .catch((err)=>console.log(err))
}


module.exports.updatebalance_post = async (req, res)=>{
    const {userid, newbalance} = req.body

    User.findByIdAndUpdate(userid, {balance: newbalance})
    .then(()=>res.status(201).json({message: "success"}))
    .catch((err)=>console.log(err))
}

// to be made
// password change
// add balance
