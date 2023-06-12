const Build = require('../models/build')


module.exports.createbuild = async (req, res)=>{
    // console.log("here")
    const {name, location, longitude, latitude, profit} = req.body;
    try{
        const build = await Build.create({ name, location, longitude, latitude, profit})
        res.status(201).json({ build })

    }catch(err){
        console.log(err)
        res.status(400).json(err)
    }
}

module.exports.getall = async (req, res)=>{
    
    try {
        let build = await Build.find({})
        res.status(200).json({ message: "buildings fetched", build })

    } catch (error) {
        res.status(400).json({ error: error })
        
    }
}

module.exports.getshort = async (req, res)=>{
    // console.log("here")
    const {lon, lat} = req.body;
    try {
        let build = await Build.find({})
        
        let val = 0;
        let ans = 1000;
        let area = "no where"
        for (const dic of build) {
            val =  Math.sqrt(  Math.pow(dic.longitude - lon , 2) + Math.pow(dic.latitude - lat , 2) );
            if (val < ans){
                ans = val
                area = dic.name
            }
        }
        ans *= 111.19
        res.status(200).json({ area, ans })

    } catch (error) {
        res.status(400).json({ error })
        
    }
}


module.exports.getlocation = async (req, res)=>{
    const {name} = req.body;
    console.log(name)
    try {
        let build = await Build.find({name: name})
        res.status(200).json({lat: build[0].latitude, lng:build[0].longitude  })

    } catch (error) {
        res.status(400).json({ error })
        
    }
}



