const customApiError = require('../errors/custom-error');
const JWT = require('jsonwebtoken');
const {StatusCodes} = require('http-status-codes');

async function authenticationMiddleware(req,res,next){  
  const authHeader = req.headers.authorization;
  if(!authHeader || !authHeader.startsWith('Bearer ')){
    throw new customApiError('No token provided',StatusCodes.UNAUTHORIZED);
  }
  const [Bearer,token] = authHeader.split(' ');
  console.log(token);
  
  try{
    const decoded = JWT.verify(token,process.env.JWT_SECRET);
    console.log(decoded);
    const randomNumber = Math.round(Math.random() * 100);
    const {username} = decoded;
    req.user= {username}
    next();
    console.log(username);
  }catch(error){
    throw new customApiError('This token is invalid',StatusCodes.BAD_REQUEST);
  }
}

module.exports = authenticationMiddleware;