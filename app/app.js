const  mogoose = require('mongoose');
const express= require('express');

const app= express();

app.get('/',(req,res)=>{
  res.send('Its work');
})
const port =process.env.PORT || 8000;
app.listen(port,(res)=>{
  console.log(`listening to port ${port}`)
})