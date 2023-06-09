const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const userRoutes = require('./routes/userRoutes')
const vmRoutes = require('./routes/vmRoutes')
const adminRoutes = require('./routes/adminRoutes')
const fbRoutes = require('./routes/fbRoutes')
const buildRoutes = require('./routes/buildRoutes')



//connect to db
const dbURI = "mongodb+srv://kalab-mike:kalab@kalab-mike.zbrvyqp.mongodb.net/DVM-database?retryWrites=true&w=majority";

const app = express()
app.use(cors({
	origin: true,
	credentials: true,
	exposedHeaders: ["token"]
}))

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
	.then((result) => console.log('Connected to database'))
	.catch((err) => console.log(err))

app.listen(3000)
//middleware and static fields
app.use(morgan('dev'))
app.use(express.json());
// app.use(urlencoded({ extended: true, limit: '50mb' }))
app.use(cookieParser())

app.get('/isconnected', (req, res) => res.status(200).json({ msg: "server online" }))
app.use(userRoutes)
app.use('/vmachine', vmRoutes)
app.use('/admin', adminRoutes)
app.use('/feedback', fbRoutes)
app.use('/build', buildRoutes)

app.use((req, res) => res.status(400).json({ msg: "wrong endpoint" }))