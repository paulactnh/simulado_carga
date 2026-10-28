const res = document.getElementById('res')
const btn_cad = document.getElementById('btn_cad')

btn_cad.addEventListener('click',(e)=>{
    e.preventDefault()

    const nome = document.getElementById('nome').value
    const cnh = document.getElementById('cnh').value
    const cpf = document.getElementById('cpf').value
    const telefone = document.getElementById('telefone').value

    const valores = {
        nome: nome,
        cnh: cnh,
        cpf: cpf,
        telefone: telefone
    }

    fetch('http://localhost:3000/motorista',{
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
        console.error('Erro ao tentar cadastrar motorista!',err)
        res.innerHTML = '<p>Erro ao tentar cadastrar motorista!</p>'
    })
})