const express = require ('express')
const router = express.Router ()

router.get('/hombres', (req,res) => {
    res.render ("hombre/hombres.hbs")  
} )




module.exports = router