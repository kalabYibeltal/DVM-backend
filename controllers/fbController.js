const fb = require('../models/feedback')
const jwt = require('jsonwebtoken')
const { Configuration, OpenAIApi } = require('openai');
const dotenv = require('dotenv');
dotenv.config()


const config = new Configuration({
	apiKey: process.env.id,
})

const openai = new OpenAIApi(config)


module.exports.createfb = async (req, res)=>{
    const {rating, feedback} = req.body;
   
    try{
        const feedbacks = await fb.create({ rating, feedback})
        res.status(201).json({ feedbacks })

    }catch(err){
        console.log(err)
        res.status(400).json(err)
    }
}

module.exports.getall = async (req, res)=>{
 
    try {
       
        let feedbacks = await fb.find({})
        res.status(200).json({ message: "feedbacks fetched", feedbacks })

    } catch (error) {
        res.status(400).json({ error: error })
        
    }
}

module.exports.getaverage = async (req, res)=>{
    try {
        // console.log("the process is",process.env.id)
        let feedbacks = await fb.find({})
        let average = 0
        let text = ""
        
        for (const doc of feedbacks) {
            average += doc.rating;
            text += doc.feedback;
        }
        
        const response = await openai.createCompletion({
            model: 'text-davinci-003',
            prompt: `summarize the text in the triple quotes into one sentence before you give me the sentence make sure the senterce
            is a formal full sentence and the sentence can be maximum of 60 words, check again the sentence is a complete sentence before
            giving me you'r response: """ ${text} """`,
        })
        
        const data = response.data.choices[0].text;
        console.log(data)
        console.log(response.data.choices[0].text.replace(/\n/g, '').replace(/\\/g, ''))
        res.status(200).json({ average: average / feedbacks.length , feedbacks:  response.data.choices[0].text.replace(/\n/g, '').replace(/\\/g, '') })

    } catch (error) {
        res.status(400).json({ error })
        
    }
}
