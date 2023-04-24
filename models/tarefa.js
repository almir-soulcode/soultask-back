const { model, Schema } = require("mongoose");

const Tarefa = model(
  "tarefa", // nome do modelo (base p/ coleção)
  new Schema({
    // validação do documento
    titulo: {
      type: String, // String, Number, Boolean
      required: true,
    },
    descricao: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: "pendente",
    },
  })
);

module.exports = Tarefa;
