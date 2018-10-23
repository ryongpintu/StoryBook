const  mogoose = require('mongoose');
const express= require('express');
const auth = require('./routes/auth');
const passport = require('passport');
const app= express();
const exphbs=require('express-handlebars');
require('./config/passport')(passport)

app.engine('handlebars',exphbs({
  defaultLayout:'main'
}));
app.set('view engine','handlebars');

app.get('/',(req,res)=>{
  res.render('index');
});

app.use('/auth',auth);
const port =process.env.PORT || 8000;
app.listen(port,(res)=>{
  console.log(`listening to port ${port}`)
})