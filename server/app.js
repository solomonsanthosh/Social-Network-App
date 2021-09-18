const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser')
const cors = require('cors');
const fs = require('fs');
require('dotenv').config();

const app = express()

app.use(bodyParser.json())
app.use(morgan('dev'))
app.use(cors())


mongoose
	.connect(process.env.DATABASE, {
		useNewUrlParser: true,
		useCreateIndex: true,
		useFindAndModify: true,
      useUnifiedTopology: true 
	})
	.then(console.log('db connected'))
	.catch((err) => console.log('error in db connection', err));


fs.readdirSync('./Routes').map((r)=> app.use('/',require('./Routes/' + r)))

app.listen(process.env.PORT, ()=> {console.log('running on port 8000');})