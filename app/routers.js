module.exports = function(app, passport) {
    
    app.get('/', function(req, res){
        res.render('index');
    });

    app.get('/signup',function(req, res){
        res.render('signup',{message:req.flash('signupMessage')});
    });

    app.get('/profile',isLoggedin, function(req, res){
        res.render('profile',{user: req.user});
    });

    app.get('/login', function(req, res){
        res.render('login',{message: req.flash('loginMessage')});
    });

    app.post('/login', passport.authenticate('local-login', {
        successRedirect: '/profile',
        failureRedirect: '/login',
        failureFlash: true
    }));

    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect: '/profile',
        failureRedirect: '/signup',
        failureFlash: true
    }));

    function isLoggedin(req, res, next){
       if(req.isAuthenticated())
        return next();
       res.redirect('/login');
    }
}
