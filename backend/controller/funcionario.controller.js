const Funcionario = require('../model/Funcionario')
const cryptoJS = require('crypto-js')
const CHAVE_SECRETA = 'segredo'

const cadastrar = async(req,res)=>{
    const valores = req.body
    try {
        const senhaCripto = cryptoJS.AES.encrypt(valores.senha, CHAVE_SECRETA).toString()
        await Funcionario.create({
            nome: valores.nome,
            email: valores.email,
            senha: senhaCripto
        })
        res.status(201).json({message: 'Funcionario cadastrado com sucesso!!'})
    } catch (err) {
        res.status(500).json({message: "erro ao tentar cadastrar funcionario!"})
        console.error('erro ao tentar cadastrar funcionario!',err)
    }
}
module.exports = { cadastrar }