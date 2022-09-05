//Configuração inicial
require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const app = express()

//Forma de ler JSON com Middlewares
app.use(
    express.urlencoded({
        extended: true,
    }),
)

app.use(express.json())

//Rotas API
const personRoutes = require('./routes/personRoutes')

app.use('/person',personRoutes)

//Rota inicial / Endpoint
app.get('/',(req, res)=>{
    //Mostrar req
    res.json({message: "Oi do Express!"})
})

//Entregar uma porta para o express
const DB_USER = process.env.DB_USER
const DB_PASSWORD = process.env.DB_PASSWORD

mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@apicluster.gbwalc6.mongodb.net/?retryWrites=true&w=majority`)
.then(()=>{
    console.log("Conectado ao MongoDB.")
    app.listen(3000)
})
.catch((err)=>{
    consolo.log(err)
})

