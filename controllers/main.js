const customApiError = require('../errors/custom-error');
const JWT = require('jsonwebtoken');
const {StatusCodes} = require('http-status-codes');

async function login(req,res){
  const {username, password} = req.body;
  console.log(req.body);
  if(!username || !password){
    throw new customApiError('Please provide the authentication information',StatusCodes.FORBIDDEN);
  }
  const id = new Date().getDate();
  const token = JWT.sign({username,id},process.env.JWT_SECRET,{expiresIn:'2d'})
  res.status(200).json({
    message: 'User Created',
    token
  });
}

async function dashboard(req,res){
  console.log(req.user);
  const randomNumber = Math.round(Math.random() * 100);
  const {username} = req.user;
  res.status(200).json({
    message: `Hi, ${username}`,
    info: "Here is your authorized information.",
    details: `Your Lucky number is ${randomNumber}`
  })
}

module.exports = {login,dashboard}