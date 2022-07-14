const express = require ('express')
const router = express.Router ()

router.get('/ninios/calzado', (req,res) => {
    res.render ("ninios/ninios.calzado.hbs")  
} )
router.get('/ninios/indumentaria', (req,res) => {
    res.render ("ninios/ninios.indumentaria.hbs")  
} )
router.get('/ninios/ropaAbrigo', (req,res) => {
    res.render ("ninios/ninios.ropaAbrigo.hbs")  
} )

router.get('/ninios/deporte', (req,res) => {
    res.render ("ninios/ninios.deporte.hbs")  
} )



module.exports = router