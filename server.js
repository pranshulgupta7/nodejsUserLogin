const express = require('express');
const session = require('express-session');
const passport = require('./passport');
const path = require('path');

const server = express();

server.use(express.json());
server.use(express.urlencoded({extended: true}));

server.use(session({
    secret: "someThingSecret"
}))

server.use(passport.initialize());
server.use(passport.session());

server.set('view engine','hbs');
server.set('views','views');

// server.use('/',require('./routes/root'));

server.get('/',(req,res) => {
    res.render('firstPAge')
})

server.use('/',express.static(path.join(__dirname,'public')));

server.use('/',require('./routes/root'));

server.use('/api',require('./routes/api').route);


server.listen(3000,() => {
    console.log('Server started at http://localhost:3000 ');
})