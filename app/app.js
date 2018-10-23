const  mongoose = require('mongoose');
const express= require('express');
const auth = require('./routes/auth');
const passport = require('passport');
const session= require('express-session');
const cookieParser=require('cookie-parser');
const app= express();
const exphbs=require('express-handlebars');
const keys= require('./config/keys');
require('./config/passport')(passport)

app.use(cookieParser())
app.use(session({
  secret:'secret',
  resave:true,
  saveUninitialized:true,
  
}));

app.use(passport.initialize());
app.use(passport.session());

app.use((req,res,next)=>{
  req.locals.user=req.user || null;
  next();
})
mongoose.connect(keys.mongoURI, { useNewUrlParser: true } )
  .then(()=>console.log('connected to db'))
  .catch((err)=>console.log('something went wrong'+err));
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