const express = require ('express')
const router = express.Router ()

router.get('/index', (req,res) => {
    res.render ("index.hbs")  
} )

router.get('/acercade', (req,res) => {
    res.render ("./acercade.hbs")  
} )

router.get('/servicios', (req,res) => {
    res.render ("./servicios.hbs")  
} )


module.exports = router