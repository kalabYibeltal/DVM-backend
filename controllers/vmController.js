const Vm = require('../models/vmachine')
const jwt = require('jsonwebtoken')

const maxAge = 3 * 24 * 60 * 60
const createToken = (id)=>{
    return jwt.sign({ id }, 'machine secret', {
        expiresIn: maxAge
    })
}



module.exports.createmachine_post = async (req, res)=>{
    let {name, numberofitems, items, city, building} = req.body;
    let temp = {};
    for (let {name, price, stock} of items){
        temp[name] = {"price":Number(price), "stock": Number(stock)}
    }
    items = temp
    const income = 0;
    try{
        const machine = await Vm.create({ name, numberofitems,items, city, building,income})
        res.status(201).json({ machine })

    }catch(err){
        console.log(err)
        res.status(400).json(err)
    }
}


module.exports.buyitem_post = async (req, res)=>{
    const {machineid, itemname} = req.body
    var machine = await Vm.findById(machineid)
    const stock = "stock";
    const price = "price";
    //{_id, name, numberofitems, uitems} 
     
    // console.log(machine.items.get(itemname)?.stock)

    machine.items.set(itemname, {price: machine.items.get(itemname)?.price, stock: machine.items.get(itemname)?.stock -1} )

    machine.income = machine.income + machine.items.get(itemname)?.price
    // console.log(machine.items)
  

    Vm.findByIdAndUpdate(machineid, {items:  machine.items, income:machine.income })
    .then(()=>res.status(201).json({message: "success"}))
    .catch((err)=>console.log(err))
}


module.exports.restockitem_post = async (req, res)=>{
    const {machineid, itemname, addedamount} = req.body
    var machine = await Vm.findById(machineid)
   
    machine.items.set(itemname, machine.items.get(itemname) + addedamount)

    Vm.findByIdAndUpdate(machineid, {items:  machine.items })
    .then(()=>res.status(201).json({message: "success"}))
    .catch((err)=>console.log(err))
}

module.exports.machinelogin = async (req, res)=>{
    const {name} = req.body

    try{
        const machine = await Vm.login(name)
        const token = createToken(machine._id)

        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 })
        res.status(200).json({ token: token, machine: machine})
    }catch(err){
        // console.log(errors)
        res.status(400).json({ errors: err.message })
        
    }
}

module.exports.getall = async (req, res)=>{
    const {name} = req.body

    try {
        console.log("here")
        let machines = await Vm.find({})
        console.log(machines)
        res.status(200).json({ message: "Machines fetched", machines })
    } catch (error) {
        console.log(error)
        res.status(400).json({ error: error })
        
    }
}



// to be made
// password change
// add balance
