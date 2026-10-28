const res = document.getElementById('res')
const btn_cad = document.getElementById('btn_cad')

btn_cad.addEventListener('click',(e)=>{
    e.preventDefault()

    const destino = document.getElementById('destino').value
    const status = document.getElementById('status').value
    const data = document.getElementById('data').value
    const idCarga = Number(document.getElementById('idCarga').value)

    const valores = {
        destino: destino,
        status: status,
        data: data,
        idCarga: idCarga
    }

    fetch('http://localhost:3000/entrega',{
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
        console.error('Erro ao tentar cadastrar entrega!',err)
        res.innerHTML = '<p>Erro ao tentar cadastrar entrega!</p>'
    })
})