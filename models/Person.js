const mongoose = require('mongoose')

//Cria uma collection (Tabela) chamada 'Persons'
const Person = mongoose.model('Person',{
    name: String,
    salary: Number,
    approved: Boolean,
})

module.exports = Person