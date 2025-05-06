


function logar() {
    const loginDigitado = document.getElementById('login').value.trim();
    const senhaDigitada = document.getElementById('senha').value.trim();

    const loginSalvo = localStorage.getItem('login');
    const senhaSalva = localStorage.getItem('senha');

    if (loginDigitado === loginSalvo && senhaDigitada === senhaSalva) {
      window.location.href = "home.html";
    } else {
      alert("Usuário ou senha incorretos.");
    }
  }