const res = document.getElementById('res')
const btn_list = document.getElementById('btn_list')

btn_list.addEventListener('click',(e)=>{
    e.preventDefault()

    fetch('http://localhost:3000/motoristas')
    .then(res => {
        return res.json()
    })
    .then(dados =>{
        res.innerHTML = ''
        res.innerHTML += `
        <table>
            ${criarThead()}
            ${criarTbody(dados)}
        </table>`        
        document.querySelector('form').reset()
    })
    .catch((err)=>{
        console.error('Erro ao tentar cadastrar motorista!',err)
        res.innerHTML = '<p>Erro ao tentar cadastrar motorista!</p>'
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