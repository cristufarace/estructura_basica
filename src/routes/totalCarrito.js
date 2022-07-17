const express = require ('express')
const router = express.Router ()


router.get('/total-carrito', (req,res) => {
    res.render ("carrito/carrito.hbs")  
} )




module.exports = router