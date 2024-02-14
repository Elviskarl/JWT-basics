async function login(req,res){
  res.send('Fake login/ Register signup Route!');
}

async function dashboard(req,res){
  const randomNumber = Math.round(Math.random() * 100);
  res.status(200).json({
    message: "Hi, Elvis Karl",
    info: "Here is your authorized information.",
    details: `Your Lucky number is ${randomNumber}`
  })
  res.send()
}

module.exports = {login,dashboard}