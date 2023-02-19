require('dotenv').config()

const express = require('express')
const app = express()
const mongoose = require('mongoose')
const passport = require('passport')
const userRoutes = require('./routes/users')
const projectRoutes = require('./routes/project')
const cors = require('cors')

mongoose.connect(process.env.MONGODBURL, { useNewUrlParser: true })
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Database'))

app.use(cors());
app.use(express.json())
app.use('/api/users', userRoutes);
app.use('/api/projects', projectRoutes);

// Passport middleware
app.use(passport.initialize());

// Passport Config
require('./config/passport')(passport);

app.listen(process.env.PORT || 3000, () => console.log(`'Server Started' on Port ${process.env.PORT}`))