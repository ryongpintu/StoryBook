const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

  googleID:{
    type:String,
    required:true // for other strategy not need to put true
  },
  firstName:{
    type:String
    
  },
  lastName:{
    type:String
  },
  email:{
    type:String,
    required:true
  },
  
  image:{
    type:String
  }
});

const User = mongoose.model('user',userSchema);

module.exports.User=User;