var pg = require('pg');
var LocalStrategy = require('passport-local').Strategy;
var Sequelize = require('sequelize');
var configDB = require('./database.js');
var sequelize = new Sequelize(configDB.url);
var User = sequelize.import('../app/model/user.js');


module.exports = function(passport){

    passport.serializeUser(function(user, done){
        done(null, user.id);
    })

    passport.deserializeUser(function(id, done){
        User.findById(id).then(function(user){
            done(null, user);
        }).catch(function(err){
            done(e, false);
        })
    })

    passport.use('local-signup', new LocalStrategy({
        usernamefield: 'email',
        passwordfield: 'password',
        passReqToCallback: true
    }, function(req, email, password, done){    
        User.findOne({where:{localemail: email}}).then(
            function(user){
                if(user){
                    done(null, false, req.flash('signupMessage','that email is already taken'))
                } else {
                    var newUser = User.build({localemail: email, localpassword: User.generatehash(password)})
                    newUser.save().then(function(){
                        done(null, newUser) 
                    }).catch(
                        function(err){
                            done(null, false, req.flash('signupMessage', err));
                        }
                    )
                }
            }
        ).catch(function(e){
            console.log(e)
            done(null, false, req.flash('signupMessage', e.name + " " + e.Message));
        })
    }))
    passport.use('local-login', 
        new LocalStrategy({
            usernamefield: 'email',
            passwordfield: 'password',
            passReqToCallback: true
        }, function(req, email, password, done){
            User.findOne({where:{localemail: email}}).then(function(user){
                if(!user){
                    done(null, false, req.flash('loginMessage','Unknown user'));
                } else if (!user.validPassword(password)) {
                    done(null, false, req.flash('loginMessage','Wrong password'));
                } else {
                    done(null, user)
                }
            }).catch(function(err){
                done(null, false, req.flash('loginMessage', err.name + " " + err.Message));
            })
        }
    ))
}