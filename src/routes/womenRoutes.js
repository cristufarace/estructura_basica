const express = require ('express')
const router = express.Router ()

router.get('/mujeres', (req,res) => {
    res.render ("mujer/mujeres.hbs")  
} )



module.exports = router