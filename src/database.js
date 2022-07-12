const mongoose = require ("mongoose")
mongoose.connect ('mongodb+srv://cristianfarace:rojo1994@cluster0.war4lia.mongodb.net/?retryWrites=true&w=majority')
.then (()=> {console.log ("Conectado a la base de datos MONGODB de forma exitosa")})
.catch ((err)=> {console.log ("error", err)})