/*

// Adiciona um evento de teclado ao botão de login
document.getElementById('loginForm').addEventListener('keyup', function(event) {
  // Verifica se a tecla pressionada é Enter (código 13)
  if (event.key === 'Enter') {
    // Chama a função de login quando Enter é pressionado
    login();
  }
});
*/

$(document).ready(function(){
    // Adiciona um evento de teclado ao botão de login
    $('#loginForm').on('keyup', function(event) {
        // Verifica se a tecla pressionada é Enter (código 13)
        if (event.key === 'Enter') {
            // Chama a função de login quando Enter é pressionado
            login();
        }
    });
});

function login() {
  const usuario= document.getElementById("usuario").value;
  const senha= document.getElementById("senha").value;

  /*Outra forma de mandar mensagem de usuário e senha incorretos*/
  /*const mensagemErro = document.getElementById("mensagemErro");*/

  if (usuario == "bioinfo" && senha == "12345"){
    /*alert("Sucesso");*/
    localStorage.setItem("usuarioLogado", true);
    location.href = "home.html";
  }
  else {
    alert("Usuário ou senha incorretos");

    /*Outra forma de mandar mensagem de usuário e senha incorretos*/
    /*mensagemErro.textContent = "Usuário ou senha incorretos";*/

    document.getElementById('usuario').value='';
    document.getElementById('senha').value='';
  }
}
// Limpar os campos quando a página for carregada ou restaurada do cache
window.addEventListener('pageshow', function(event) {
  var historyTraversal = event.persisted || (typeof window.performance != 'undefined' && window.performance.navigation.type === 2);
  if (historyTraversal) {
    // A página está sendo carregada do cache, então limpe os campos
    document.getElementById('usuario').value = '';
    document.getElementById('senha').value = '';
  }
});
