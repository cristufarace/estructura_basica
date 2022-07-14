const express = require ('express')
const router = express.Router ()

router.get('/ninios', (req,res) => {
    res.render ("ninios/ninios.hbs")  
} )


module.exports = router