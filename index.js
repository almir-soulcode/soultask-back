require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

// Configuração do App
const app = express();
app.use(express.json());

// Configuração do Banco de Dados
mongoose.connect(process.env.MONGODB_URL);
const Tarefa = require("./models/tarefa");

// Inserção de Tarefa (POST)
app.post("/tarefas", async (req, res) => {
  try {
    // Coletar os dados do body
    const { titulo, descricao, status } = req.body;
    // Criando um novo documento do Mongo
    const tarefa = new Tarefa({ titulo, descricao, status });
    // Inserir o documento na coleção tarefas
    await tarefa.save();
    res.status(201).json(tarefa);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Um erro aconteceu." });
  }
});

// Listagem de todas as Tarefas (GET)
// Listagem de uma Tarefa (GET)
// Atualização de uma Tarefa (PUT)
// Remoção de uma Tarefa (DELETE)

// Escuta de eventos
app.listen(3000, () => {
  console.log("Servidor rodando em http://localhost:3000/");
});
