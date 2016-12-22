var express = require('express');
var app = express();
var session = require('express-session');
var passport = require('passport');
var flash = require('connect-flash');
var bodyParser = require('body-parser');
var parser = bodyParser.urlencoded({extended:false});
app.use(express.static('public'));
require('./config/passport.js')(passport);

app.set('view engine','ejs');
app.set('views','./views');


app.use(session({secret:'32423jhsdkjfhsdf', cookie: { maxAge: 60000 }, resave: true, saveUninitialized: true}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(parser);


app.listen(3000, () => {
    console.log('server started')
})
require('./app/routers.js')(app, passport);

