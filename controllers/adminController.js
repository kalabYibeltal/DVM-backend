const jwt = require('jsonwebtoken')
const Admin = require('../models/admin')
const { findById } = require('../models/admin')
const Vm = require('../models/vmachine')
const User = require('../models/user')

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

module.exports.adminsignup_post = async (req, res)=>{
    const {name,email, password} = req.body;
 
    
    try{
        const admin = await Admin.create({name, email, password})
        res.status(201).json({ admin: admin })

    }catch(err){
        const errors = handleErrors(err)
        res.status(400).json({errors})
        console.log(err)
    }
}

module.exports.adminlogin_post = async (req, res)=>{
    const {email, password} = req.body

    try{
        const admin = await Admin.login(email, password)
        const token = createToken(admin._id)

        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 })
        res.status(200).json({ token: token, admin: admin})
    }catch(err){
        console.log(err)
        const errors = handleErrors(err)
        res.status(400).json({ errors })
        
    }
}

module.exports.machinedata = async (req, res)=>{
    try {
        let income = 0;
        let vmachines = await Vm.find({})
        const machines = vmachines.length;
        for (let machine of vmachines){
            income += machine.income
        }

        res.status(200).json({ income, machines })

    } catch (error) {
        console.log(error)
        res.status(400).json({ error: error })
        
    }
}



module.exports.userdata = async (req, res)=>{
    try {
        let customersbalance = 0;
        let users = await User.find({})
        console.log(users)
        const customers = users.length;
        console.log(customers)
        for (let user of users){
            customersbalance += user.balance
        }

        res.status(200).json({ customersbalance, customers })

    } catch (error) {
        console.log(error)
        res.status(400).json({ error: error })
        
    }
}