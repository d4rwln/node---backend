const express = require('express');
const cors = require('cors');
const requireDir = require('require-dir');
requireDir("./src/models")

//Inicializa o express
const app = express();
//Permite envio de Json pro BACKEND
app.use(express.json());
app.use(cors());

// Conecta ao banco
require ("./connection.js");

app.use("/api", require('./src/routes'))

app.listen('80'); 