const Bands = require('../../db').Bands;

const Users = require('../../db').Users;

const route = require('express').Router();

route.get('/:id',(req,res) => {
    Bands.findAll({
        where: {
            userId: req.params.id,
            isDelete: '1'
        },
        include: [
            {
                model: Users,
            }
        ]
    })
        .then((bands) => {
            res.status(200).render('bands',{bands:bands,id:req.params.id})
        })
        .catch((err) => {
            res.status(500).send({
                error: "Could not retrive all bands"
            })
        })
})

route.post('/:id',(req,res) => {
    Bands.create({
        name: req.body.name,
        userId: req.params.id
    }).then((band) => {
        res.status(201).redirect(`/api/bands/${req.params.id}`)
    }).catch((error) => {
        res.status(501).send({
            error: "Could not add band"
        })
    })
})

route.post('/delete/:id',(req,res) => {
    Bands.update({
        isDelete: '0'
    },
    {
    where:{
        id: req.params.id
    }}).then((band) => {
        Bands.findOne({
            where: {
                id: req.params.id
            }
        }).then((band) => {
            res.status(201).redirect(`/api/bands/${band.userId}`)
        })
    }).catch((err) => {
        res.status(501)
    })
})

route.post('/edit/:id',(req,res) => {
    Bands.update({
        name: req.body.name
    },
    {
    where:{
        id: req.params.id
    }}).then((band) => {
        Bands.findOne({
            where: {
                id: req.params.id
            }
        }).then((band) => {
            res.status(201).redirect(`/api/bands/${band.userId}`)
        })
    }).catch((err) => {
        res.status(501)
    })
})

route.get('/',(req,res) => {
    Bands.findAll()
        .then((bands) => {
            res.status(200).send(bands)
        })
        .catch((err) => {
            res.status(500).send({
                error: "Could not retrive all bands"
            })
        })
})

route.post('/',(req,res) => {
    Bands.create({
        name: req.body.name,
        userId: req.body.userId
    }).then((band) => {
        res.status(201).send(band)
    }).catch((error) => {
        res.status(501).send({
            error: "Could not add band"
        })
    })
})

exports = module.exports = route;
