const  mogoose = require('mongoose');
const express= require('express');
const auth = require('./routes/auth');
const passport = require('passport');
const app= express();

require('./config/passport')(passport)
app.get('/',(req,res)=>{
  res.send('Its work');
});

app.use('/auth',auth);
const port =process.env.PORT || 8000;
app.listen(port,(res)=>{
  console.log(`listening to port ${port}`)
})