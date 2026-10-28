
const res = document.getElementById('res')
const btn_cad = document.getElementById('btn_cad')

btn_cad.addEventListener('click',(e)=>{
    e.preventDefault()

    const descricao = document.getElementById('descricao').value
    const peso = Number(document.getElementById('peso').value)
    const volume = Number(document.getElementById('volume').value)
    const codRastreio = document.getElementById('codRastreio').value
    const idMotorista = Number(document.getElementById('idMotorista').value)

    const valores = {
        descricao: descricao,
        peso: peso,
        volume: volume,
        codRastreio: codRastreio,
        idMotorista: idMotorista
    }

    fetch('http://localhost:3000/carga',{
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(valores)
    })
    .then(res => {
        return res.json()
    })
    .then(dados =>{
        res.innerHTML = ''
        res.innerHTML += `<p>${dados.message}</p>`
        document.querySelector('form').reset()
    })
    .catch((err)=>{
        console.error('Erro ao tentar cadastrar carga!',err)
        res.innerHTML = '<p>Erro ao tentar cadastrar carga!</p>'
    })
})