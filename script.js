function login() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  // Verifica se o usuário e senha correspondem
  if (username === "bioinfo" && password === "12345") {
    // Usuário e senha corretos, faz a requisição ao servidor (substitua com chamadas reais do servidor)
    fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    })
      .then(response => response.json())
      .then(data => {
        const responseElement = document.getElementById("response");
        responseElement.innerHTML = data.message;
      });
  } else {
    // Usuário e senha incorretos, exibe uma mensagem de erro
    const responseElement = document.getElementById("response");
    responseElement.innerHTML = "Usuário ou senha incorretos.";
  }
}