let btnLogin = document.getElementById('btnLogin');

btnLogin.addEventListener('click', (e) => {
    e.preventDefault();

    let email = document.getElementById('email').value;
    let senha = document.getElementById('senha').value;

    const dados = { email, senha };

    fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dados)
    })
        .then(resp => resp.json().then(body => {
            if (!resp.ok) throw new Error(body.message);
            return body;
        }))
        .then(dados => {

            alert(dados.message);

            if (!dados.token) {
                alert('Erro ao fazer login!');
                return;
            }

            // ==============================
            // SALVANDO CORRETAMENTE OS DADOS
            // ==============================
            sessionStorage.setItem('token', dados.token);
            sessionStorage.setItem('nome', dados.usuario.nome);
            sessionStorage.setItem('tipo_usuario', dados.usuario.tipo_usuario);

            // salvar o id real do usuário
            sessionStorage.setItem("idUsuario", dados.usuario.codUsuario);

            // também salva no localStorage caso queira usar depois
            localStorage.setItem("usuarioLogado", JSON.stringify(dados.usuario));

            // Redirecionar
            setTimeout(() => {
                if (dados.usuario.tipo_usuario === 'ADMIN') {
                    location.href = 'home.html';
                } else {
                    location.href = 'loja.html';
                }
            }, 1500);
        })
        .catch((err) => {
            console.error('Falha ao fazer login!', err);
            alert(err.message);
        });
});
