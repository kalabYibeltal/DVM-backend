const Vm = require('../models/vmachine')




module.exports.createmachine_post = async (req, res)=>{
    const {name, numberofitems, items} = req.body;
   
    try{
        const machine = await Vm.create({ name, numberofitems,items})
        res.status(201).json({ machine })

    }catch(err){
        console.log(err)
    }
}


module.exports.buyitem_post = async (req, res)=>{
    const {machineid, itemname} = req.body
    var machine = await Vm.findById(machineid)
    //{_id, name, numberofitems, uitems} 
    
    // console.log()
    machine.items.set(itemname, machine.items.get(itemname) -1)
    // console.log(machine.items)
  

    Vm.findByIdAndUpdate(machineid, {items:  machine.items })
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


// to be made
// password change
// add balance
