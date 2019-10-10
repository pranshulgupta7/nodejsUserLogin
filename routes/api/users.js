const Users = require('../../db').Users;
const Bands = require('../../db').Bands;
const route = require('express').Router();

route.get('/',(req,res) => {
    //we want to send an array of all users from our database

    Users.findAll({
        include: [
            {
                model: Bands
            }
        ]
    })
        .then((users) => {

            const resObj = users.map((user) => {
                return Object.assign(
                    {},
                    {
                        id: user.id,
                        username: user.username,
                        password: user.password,
                        bands: user.bands.map((band) => {
                            return Object.assign(
                                {},
                                {
                                    id: band.id,
                                    name: band.name,
                                    userId: band.userId
                                }
                            )
                        })
                    }
                )
            })
            res.status(200).send(resObj)
        })
        .catch((err) => {
            res.status(500).send({
                error: "Could not retrieve all users"
            })
        })

});

route.get('/:id',(req,res) => {
    //we want to send an user from our database

    Bands.findAll({
        where: {
            userId: req.params.id
        },
        include: [
            {
                model: Users,
            }
        ]
    }).then((bands) => {
        res.send(bands)
    }).catch((err) => {
        res.status(500).send({
            error: "Could not retrieve Bands List"
        })
    })

});

route.post('/',(req,res) => {
    //create new user

    Users.create({
        username: req.body.username,
        password: req.body.password
    }).then((user) => {
        res.status(201).send(user)
    }).catch((err) => {
        res.status(501).send({
            error: "Could not add new user"
        })
    })
})

exports = module.exports = route;