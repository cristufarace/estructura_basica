const express = require ('express')
const router = express.Router ()


router.get('/mujeres/calzado', (req,res) => {
    res.render ("mujer/mujeres.calzado.hbs")  
} )
router.get('/mujeres/indumentaria', (req,res) => {
    res.render ("mujer/mujeres.indumentaria.hbs")  
} )
router.get('/mujeres/deporte', (req,res) => {
    res.render ("mujer/mujeres.deporte.hbs")  
} )
router.get('/mujeres/ropaAbrigo', (req,res) => {
    res.render ("mujer/mujeres.ropaAbrigo.hbs")  
} )



module.exports = router