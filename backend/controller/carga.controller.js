const Carga = require('../model/Carga')
const Motorista = require('../model/Motorista')

const cadastrar = async(req,res)=>{
    const valores = req.body
    try {
        const motorista = await Motorista.findByPk(valores.idMotorista)
        if(!motorista){
            return res.status(404).json({message: 'Motorista inexistente'})
        }

        await Carga.create(valores)
        res.status(201).json({message: 'carga cadastrada com sucesso!!'})
    } catch (err) {
        res.status(500).json({message: "erro ao tentar cadastrar carga!"})
        console.error('erro ao tentar cadastrar carga!',err)
    }
}
module.exports = { cadastrar }