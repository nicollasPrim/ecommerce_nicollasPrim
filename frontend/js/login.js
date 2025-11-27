let btnLogin = document.getElementById('btnLogin')
let res = document.getElementById('res') 

btnLogin.addEventListener('click', (e) => {
    e.preventDefault()

    let email = document.getElementById('email').value
    let senha = document.getElementById('senha').value

    if (!email || !senha) {
        res.innerHTML = `Preencha todos os campos!`
        res.style.color = 'red'
        res.style.textAlign = 'center'
        return
    }

    const dados = { email, senha }

    fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dados)
    })
    .then(resp => resp.json())
    .then(dados => {

        // SE LOGIN FALHA
        if (!dados.token || !dados.usuario) {
            sessionStorage.clear()              // <-- limpando token corrompido
            res.innerHTML = dados.mensagem || dados.message || 'Erro ao fazer login!'
            res.style.color = 'red'
            res.style.textAlign = 'center'
            return
        }

        // SUCESSO
        alert('Login realizado com sucesso!')
        console.log(dados)

        // SALVA DADOS
        sessionStorage.setItem('token', dados.token)
        sessionStorage.setItem('nome', dados.usuario.nome)
        sessionStorage.setItem('tipo_usuario', dados.usuario.tipo_usuario)


        // REDIRECIONA
        if (dados.usuario.tipo_usuario === 'ADMIN') {
            location.href = './html/home.html'
        } else {
            location.href = './html/loja.html'
        }
    })
    .catch(err => {
        console.error('Falha ao fazer login!', err)
        res.innerHTML = 'Erro ao conectar ao servidor!'
        res.style.color = 'red'
    })
})
