const res = document.getElementById('res')
const btn_consultar = document.getElementById('btn_consultar')

btn_consultar.addEventListener('click',(e)=>{
    e.preventDefault()

    const id = document.getElementById('id').value

    fetch(`http://localhost:3000/motorista/${id}`)
    .then(res => {
        return res.json()
    })
    .then(dados =>{
        res.innerHTML = ''
        res.innerHTML += `
        <table>
            ${criarThead()}
            ${criarTbody([dados])}
        </table>`        
        document.querySelector('form').reset()
    })
    .catch((err)=>{
        console.error('Erro ao tentar listar motorista!',err)
        res.innerHTML = '<p>Erro ao tentar listar motorista!</p>'
    })
})

function criarThead(){
    return `
        <thead>
            <tr>
                <th>Código</th>
                <th>Nome</th>
                <th>CNH</th>
                <th>CPF</th>
                <th>Telefone</th>
            </tr>
        </thead>`
}

function criarTbody(dados){
    let tbody = ''
    dados.forEach(el => {
        tbody += `
        <tbody>
            <tr>
                <td>${el.codMotorista}</td>
                <td>${el.nome}</td>
                <td>${el.cnh}</td>
                <td>${el.cpf}</td>
                <td>${el.telefone}</td>
            </tr>
        </tbody>
        `
    })
    return tbody
}