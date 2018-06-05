const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const register = require('./controllers/register')
const signin = require('./controllers/signin')
const profile = require('./controllers/profile')
const image = require('./controllers/image')
 
 const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : '820501Dl',
    database : 'smartbrain'
  }
});

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.post('/signin', (req, res) => { signin.handleSignin(req, res, bcrypt, db) })
app.post('/register', (req, res) => { register.handleRegister(req, res, bcrypt, db) })
app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, db) })
app.put('/image', (req, res) => { image.handleImagePut(req, res, db) })
app.post('/imageUrl', (req, res) => { image.handleApiCall(req, res, db) })

//Below are for debugging purposes
app.get('/displayUsers', (req, res) => {
	db.select('*').from('users')
	.then(user => res.json(user))
	.catch(err => res.status(400).json('Error displaying'))
})

app.get('/displayLogin', (req, res) => {
	db.select('*').from('login')
	.then(user => res.json(user))
	.catch(err => res.status(400).json('Error displaying'))
})

// till here ----------------

app.listen(3000, ()=>{
	console.log('app is running on the port 3000')
})

