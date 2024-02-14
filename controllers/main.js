const customApiError = require('../errors/custom-error');
const JWT = require('jsonwebtoken');

async function login(req,res){
  const {username, password} = req.body;
  console.log(req.body);
  if(!username || !password){
    throw new customApiError('Please provide the authentication information',400);
  }
  const id = new Date().getDate();
  const token = JWT.sign({username,id},process.env.JWT_SECRET,{expiresIn:'2d'})
  res.status(200).json({
    message: 'User Created',
    token
  });
}

async function dashboard(req,res){
  // console.log(req.headers);
  const authHeader = req.headers.authorization;
  if(!authHeader || !authHeader.startsWith('Bearer ')){
    throw new customApiError('No token provided',401);
  }
  const [Bearer,token] = authHeader.split(' ');
  console.log(token);

  try{
    const decoded = JWT.verify(token,process.env.JWT_SECRET);
    console.log(decoded);
    const randomNumber = Math.round(Math.random() * 100);
    const {username} = decoded;
    console.log(username);
    res.status(200).json({
      message: `Hi, ${username}`,
      info: "Here is your authorized information.",
      details: `Your Lucky number is ${randomNumber}`
    })
  }catch(error){
    throw new customApiError('This token is invalid',401);
  }
}

module.exports = {login,dashboard}