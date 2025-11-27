let btnCadAdmin = document.getElementById('btnCadAdmin')

btnCadAdmin.addEventListener('click', (e) => {
    e.preventDefault()

    let nome = document.getElementById('nome').value
    let email = document.getElementById('email').value
    let telefone = document.getElementById('telefone').value
    let cpf = document.getElementById('cpf').value
    let identidade = document.getElementById('identidade').value
    let senha = document.getElementById('senha').value

    // --- valida base, igual ao de usuário ---
    if (!nome || !email || !telefone || !cpf || !senha) {
        alert('Preencha todos os campos obrigatórios!')
        return
    }

    const dados = {
        nome: nome,
        email: email,
        telefone: telefone,
        cpf: cpf,
        identidade: identidade,
        senha: senha,
        tipo_usuario: 'ADMIN'   // <-- AQUI O DIFERENCIAL
    }

    fetch('http://localhost:3000/usuario', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dados)
    })
    .then(resp => resp.json())
    .then(dados => {

        alert('Administrador cadastrado com sucesso!')

        // Redireciona após 2s
        setTimeout(() => {
            window.location = '../index.html'
        }, 2000)
    })
    .catch((err) => {
        console.error('Falha ao cadastrar administrador!', err)
        alert('Falha ao cadastrar administrador!')
    })
})
