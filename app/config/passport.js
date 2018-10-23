const GoogleStrategy = require('passport-google-oauth20').Strategy;
const {User} =require('../models/Users');
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
      // console.log(accessToken,profile);

      const image = profile.photos[0].value.substring(0,
        profile.photos[0].value.indexOf('?'));
        
        const newUser={
          googleID:profile.id,
          firstName:profile.name.givenName,
          lastName:profile.name.familyName,
          email:profile.emails[0].value,
          image:image
        }

        User.findOne({googleID:profile.id})
          .then(user=>{
            if(user){
              done(null,user)
            }else{
              new User(newUser)
                .save()
                .then(user=>done(null,user))
            }
          })
    })
  )

  passport.serializeUser((user, done)=> {
    done(null, user.id);
  });
  
  passport.deserializeUser((id, done) =>{
    User.findById(id, (err, user)=> {
      done(err, user);
    });
  });
}