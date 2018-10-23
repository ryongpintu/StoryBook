const GoogleStrategy = require('passport-google-oauth20').Strategy;

const mongoose= require('mongoose');

const keys= require('./keys');

module.exports =function(passport){
  passport.use(
    new GoogleStrategy({
      clientID:keys.googleClientID,
      clientSecret:keys.googleClientSecret,
      callbackURL:'/auth/google/callback',
      proxy:true  // on heroku it will add https  so its required
    },(accessToken,refreshToken,profile,done)=>{
      console.log(accessToken,profile);
    })
  )
}