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
app.put("/tarefas/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { titulo, descricao, status } = req.body;

    // Caso encontre o id, realiza a atualização
    // Retorna o objeto encontrado
    const tarefaExistente = await Tarefa.findByIdAndUpdate(id, {
      titulo,
      descricao,
      status,
    });

    if (tarefaExistente) {
      res.json({ message: "Tarefa editada." });
    } else {
      res.status(404).json({ message: "Tarefa não encontrada." });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Um erro aconteceu." });
  }
});

// Remoção de uma Tarefa (DELETE)
app.delete("/tarefas/:id", async (req, res) => {
  try {
    // Checa se a tarefa existe, e então remove do banco
    const { id } = req.params;
    const tarefaExistente = await Tarefa.findByIdAndRemove(id);

    const tarefasRestantes = await Tarefa.find();

    if (tarefaExistente) {
      res.json({ message: "Tarefa excluída.", tarefasRestantes });
    } else {
      res.status(404).json({ message: "Tarefa não encontrada." });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Um erro aconteceu." });
  }
});

// Escuta de eventos
app.listen(3000, () => {
  console.log("Servidor rodando em http://localhost:3000/");
});
