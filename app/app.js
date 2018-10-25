const  mongoose = require('mongoose');
const express= require('express');
const path= require('path');
const auth = require('./routes/auth');
const index = require('./routes/index');
const stories= require('./routes/stories');
const passport = require('passport');
const session= require('express-session');
const cookieParser=require('cookie-parser');
const methodOverride=require('method-override');
const app= express();
const exphbs=require('express-handlebars');
const keys= require('./config/keys');
const {truncate,stripTags,formatDate,select,editIcon}=require('./helpers/hbs')

const bodyParser = require('body-parser');
require('./config/passport')(passport)

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json());
app.use(cookieParser())
app.use(session({
  secret:'secret',
  resave:true,
  saveUninitialized:true,
  
}));

app.use(passport.initialize());
app.use(passport.session());

app.use((req,res,next)=>{
  res.locals.user= req.user || null;
  next();
})
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname,'public')));
mongoose.connect(keys.mongoURI, { useNewUrlParser: true } )
  .then(()=>console.log('connected to db'))
  .catch((err)=>console.log('something went wrong'+err));
app.engine('handlebars',exphbs({
  helpers:{
    select:select,
    formatDate:formatDate,
    truncate:truncate,
    stripTags:stripTags,
    editIcon:editIcon
  },
  defaultLayout:'main'
}));
app.set('view engine','handlebars');

app.use('/',index);
app.use('/auth',auth);
app.use('/stories',stories);
const port =process.env.PORT || 8000;
app.listen(port,(res)=>{
  console.log(`listening to port ${port}`)
})