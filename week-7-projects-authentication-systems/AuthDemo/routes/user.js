const express = require('express')
const bcrypt = require("bcrypt");
const UserModel = require("../model/users.js");
const isLoggedIn = require('../middlewares/isLoggedIn.js');
const jwt = require("jsonwebtoken")

const routes = express.Router()

routes.post('/register', async (req, res, next)=> {
  try {
    // get the username and password from the req body
    const { username, password } = req.body;

    // check if th username already exist and return error
    const userExist = await UserModel.findOne({ 
      username: username 
    })

    if(userExist) {
      res.status(400).send('Username already exist')
    }

    // hash the password
    const passwordSalt = await bcrypt.genSalt(12)
    const hashPassword = await bcrypt.hash(password, passwordSalt)

    // save the username and hashPassword into the DB
    const user = new UserModel({
      username: username,
      hashPassword: hashPassword
    })
    await user.save()
    res.status(201).send('You have registered successfully')
  } catch (e) {
    next(e)
  }
})

routes.post('/login', async (req, res, next)=> {
  try {
    // get the username and password from the req body
    const { username, password } = req.body;

    // find the user on our db with their username
    const userExist = await UserModel.findOne({ 
      username: username 
    })
    // check if they do not exist, we send an error
    if (!userExist) {
      res.status(400).send('Username or password is incorrect')
    }
    // check if the password is correct
    const isPasswordCorrect = await bcrypt.compare(password, userExist?.hashPassword)

    if (!isPasswordCorrect) {
      res.status(400).send('Username or password is incorrect')
    }

    // Generate a jwt for the user
    const token = jwt.sign({
      userId: userExist?._id,
      username: userExist?.username
    }, process.env.secrets, { expiresIn: '12' })

    res.status(200).json({
      message: 'You have logged in successfully',
      token,
    })
  } catch (e) {
    next(e)
  }
})

routes.get('/secret', isLoggedIn, async (req, res, next)=> {
  res.send('This is a protected route and can be accessed by only logged in users')
})

module.exports = routes
