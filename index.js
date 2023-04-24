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
app.get("/tarefas", async (req, res) => {
  // Realiza uma busca de todos os documentos na coleção
  const tarefas = await Tarefa.find();
  res.json(tarefas);
});

// Listagem de uma Tarefa (GET)
app.get("/tarefas/:id", async (req, res) => {
  try {
    const { id } = req.params;
    // Realiza uma busca específica por um documento
    const tarefaExistente = await Tarefa.findById(id);

    if (tarefaExistente) {
      // Responde com o documento encontrado
      res.json(tarefaExistente);
    } else {
      // Notifica o erro exatamente
      res.status(404).json({ message: "Tarefa não encontrada." });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Um erro aconteceu." });
  }
});

// Atualização de uma Tarefa (PUT)
// Remoção de uma Tarefa (DELETE)

// Escuta de eventos
app.listen(3000, () => {
  console.log("Servidor rodando em http://localhost:3000/");
});
