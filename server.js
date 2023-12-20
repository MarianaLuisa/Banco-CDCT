const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
const port = 4000;

app.use(bodyParser.json());

app.post("/login", (req, res) => {
  const { username, password } = req.body;

  // Simulando autenticação (substitua com lógica real de autenticação)
  if (username === "bioinfo" && password === "12345") {
    res.json({ success: true, message: "Login successful!" });
  } else {
    res.json({ success: false, message: "Invalid credentials!" });
  }
});

// Configurar o middleware para servir arquivos estáticos
app.use(express.static(path.join(__dirname, "public")));

// Rota padrão para lidar com qualquer outra solicitação
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
