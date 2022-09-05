const router =  require('express').Router()
const Person = require('../models/Person')

//Create - criação de dados
router.post('/',async(req, res)=>{
    //req.body
    //Mesma coisa que {name: "Matheus", salary: 5000, approved: false}
    const {name, salary, approved} =  req.body

    if(!name){
       res.status(422).json({error: "A inserção do Nome é obrigatório"}) 
       return
    }

    if(!salary){
        res.status(422).json({error: "A inserção de Salário é obrigatório"}) 
        return
     }

     if(!approved){
        res.status(422).json({error: "A inserção de Aprovação é obrigatória"}) 
        return
     }
 
    const person = {
        name,
        salary,
        approved
    }

    //Cria dados no sistema
    try {
        await Person.create(person)

        res.status(201).json({message: "Pessoa inserida no sistema com sucesso!"})

    } catch (error) {
        res.status(500).json({error: error})
    }
})

// Read - Leitura de dados
router.get('/',async(req, res)=>{
    try {

        //Retorna todos os dados da coleção
        const peaple = await Person.find()

        res.status(200).json(peaple)
    } catch (error) {
        res.status(500).json({error: error})
    }
})

router.get('/:id', async(req, res)=>{
    //Extrai o dado da requisição, pela url = req.params
    const id = req.params.id

    try {
        const person = await Person.findOne({_id: id}) 
        
        if(!person){
            res.status(422).json({message: "O usuário desejado não foi encontrado."})
            return
        }

        res.status(200).json(person)
    } catch (error) {
        res.status(500).json({error: error})
    }
})

// Update - Atualização de dados (PUT, PATCH)

//O Patch só atualza uma parte do objeto. Ao contrário do PUT que atualiza o Objeto inteiro
router.patch('/:id',async(req, res)=>{
    const id = req.params.id

    const {name, salary, approved} = req.body

    const person = {
        name,
        salary, 
        approved
    }

    try {
        const updatedPerson = await Person.updateOne({_id: id}, person)

        //Caso o número de registros atualizados seja 0
        if(updatedPerson.matchedCount === 0){
            res.status(422).json({message: "O usuário desejado não foi encontrado."})
            return
        }

        res.status(200).json(person)
    } catch (error) {
        res.status(500).json({error: error})
    }
})

//Delete - Deleta dados
router.delete('/:id',async(req, res)=>{
    const id = req.params.id

    const person = await Person.findOne({_id: id })
    if(!person){
        res.status(422).json({message: "O usuário desejado não foi encontrado."})
        return
    }

    try {
        await Person.deleteOne({_id: id})
        res.status(200).json({message: "Usuário removido com sucesso."})
    } catch (error) {
        res.status(500).json({error: error})
    }

})

module.exports = router