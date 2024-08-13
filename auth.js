const localStrategy = require('passport-local').Strategy;
const Person = require('./models/person.js');
const passport = require("passport");


passport.use(new localStrategy(async (username, password, done) => {
    // authentication logic here
       try{
            //  console.log('recieved creds', username, password);
             const user = await Person.findOne({username: username});
             if(!user) {
                return done(null, false, {message: 'Incorrect Username '});
             }

             const isPasswordMatch = await user.comparePassword(password);
             if(isPasswordMatch) {
                return done(null, user);
             }
             else {
                return done(null,false, {message: 'Incorrect passsword.'});
             }
       } 
       catch(err) {
             return done(err);
       }
}));

module.exports = passport; // export configured passport
