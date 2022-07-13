const express = require ('express')
const router = express.Router ()

router.get('/', (req,res) => {
    res.render ("index.hbs")  
} )




router.get('/cuadros', (req,res) => {
    res.render ("./cuadros/cuadros.hbs")  
} )


module.exports = router