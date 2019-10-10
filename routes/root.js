const route = require('express').Router();
const passport = require('../passport');
const Users = require('../db').Users;

route.get('/signup',(req,res) => {
    res.render('signup');
});
route.get('/login',(req,res) => {
    res.render('login');
})

route.post('/signup',(req,res) => {
    Users.create({
        username: req.body.username,
        password: req.body.password
    }).then((user) => {
        res.redirect('/login')
        //res.status(201).send(user)
    }).catch((err) => {
        res.status(501).send({
            error: "Could not add new user"
        })
    })
})

//route.post('/signup',require(__dirname + '/api/users'));
route.post('/login',passport.authenticate('local'),function(req, res) {
    // If this function gets called, authentication was successful.
    // `req.user` contains the authenticated user.
    res.redirect(`/api/bands/${req.user.id}`);

  });

exports = module.exports = route