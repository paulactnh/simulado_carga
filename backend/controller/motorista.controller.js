const Motorista = require('../model/Motorista')
const cryptoJS = require('crypto-js')
const CHAVE_SECRETA = 'segredo'

const cadastrar = async(req,res)=>{
    const valores = req.body
    try {
        const cnhCripto = cryptoJS.AES.encrypt(valores.cnh, CHAVE_SECRETA).toString()
        const cpfCripto = cryptoJS.AES.encrypt(valores.cpf, CHAVE_SECRETA).toString()
        await Motorista.create({
            nome: valores.nome,
            cnh: cnhCripto,
            cpf: cpfCripto,
            telefone: valores.telefone
        })
        res.status(201).json({message: 'motorista cadastrado com sucesso!!'})
    } catch (err) {
        res.status(500).json({message: "erro ao tentar cadastrar motorista!"})
        console.error('erro ao tentar cadastrar motorista!',err)
    }
}

const listar = async(req,res)=>{
    try {
        const motoristas = await Motorista.findAll()
        let resultado = []
        motoristas.forEach(el => {
            let cnhDecrypt = ''
            let cpfDecrypt = ''
            try {
                const bytesCnh = cryptoJS.AES.decrypt(el.cnh,CHAVE_SECRETA)
                cnhDecrypt = bytesCnh.toString(cryptoJS.enc.Utf8)
                const bytesCpf = cryptoJS.AES.decrypt(el.cpf,CHAVE_SECRETA)
                cpfDecrypt = bytesCpf.toString(cryptoJS.enc.Utf8)
            } catch (err) {
                cnhDecrypt = 'Erro ao descriptografar'
                cpfDecrypt = 'Erro ao descriptografar'
                console.error(cnhDecrypt, err)
            }

            resultado.push({
                codMotorista: el.codMotorista,
                nome: el.nome,
                cnh: cnhDecrypt,
                cpf: cpfDecrypt,
                telefone: el.telefone 
            })
        })
        res.status(200).json(resultado)
    } catch (err) {
        res.status(500).json({message: "erro ao tentar listar motorista!"})
        console.error('erro ao tentar listar motorista!',err)
    }
}

const consultar = async(req,res)=>{
    const id = req.params.id
    try {
        const motorista = await Motorista.findByPk(id)
        if(!motorista){
            return res.status(404).json({message: "Motorista inexistente!!"})
        }

        const bytesCnh = cryptoJS.AES.decrypt(motorista.cnh,CHAVE_SECRETA)
        const cnhDecrypt = bytesCnh.toString(cryptoJS.enc.Utf8)
        const bytesCpf = cryptoJS.AES.decrypt(motorista.cpf,CHAVE_SECRETA)
        const cpfDecrypt = bytesCpf.toString(cryptoJS.enc.Utf8)

        const motorista2 = {
            codMotorista: motorista.codMotorista,
            nome: motorista.nome,
            cnh: cnhDecrypt,
            cpf: cpfDecrypt,
            telefone: motorista.telefone 
        }
        res.status(200).json(motorista)
    } catch (err) {
         res.status(500).json({message: "erro ao tentar consultar motorista!"})
        console.error('erro ao tentar consultar motorista!',err)
    }
}

module.exports = { cadastrar, listar, consultar }
