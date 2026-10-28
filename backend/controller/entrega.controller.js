const Entrega = require('../model/Entrega')
const Carga = require('../model/Carga')

const cadastrar = async(req,res)=>{
    const valores = req.body
    try {
        const carga = await Carga.findByPk(valores.idCarga)
        if(!carga){
            return res.status(404).json({message: 'Carga inexistente'})
        }

        await Entrega.create(valores)
        res.status(201).json({message: 'entrega cadastrada com sucesso!!'})
    } catch (err) {
        res.status(500).json({message: "erro ao tentar cadastrar entrega!"})
        console.error('erro ao tentar cadastrar entrega!',err)
    }
}
module.exports = { cadastrar }