const route = require('express').Router();

route.use('/bands',require('./bands'));
route.use('/users',require('./users'));

exports = module.exports = {
    route
}