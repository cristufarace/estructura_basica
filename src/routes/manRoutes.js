const express = require ('express')
const router = express.Router ()


router.get('/hombres/calzado', (req,res) => {
    res.render ("hombre/hombres.calzado.hbs")  
} )
router.get('/hombres/indumentaria', (req,res) => {
    res.render ("hombre/hombres.indumentaria.hbs")  
} )
router.get('/hombres/deporte', (req,res) => {
    res.render ("hombre/hombres.deporte.hbs")  
} )
router.get('/hombres/ropaAbrigo', (req,res) => {
    res.render ("hombre/hombres.ropaAbrigo.hbs")  
} )



module.exports = router