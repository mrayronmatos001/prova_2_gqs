const express = require("express");
const produtoRoutes = require("./routes/produtoRoutes");
const categoriaRoutes = require("./routes/categoriaRoutes");
const estoqueRoutes = require("./routes/estoqueRoutes");
const { sequelize } = require("./models/database");


const app = express();
const port = 3000;

app.use(express.json());
app.use("/api", produtoRoutes);
app.use("/api", categoriaRoutes);
app.use("/api", estoqueRoutes);


app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
  sequelize.authenticate()
    .then(() => {
      console.log("Conexão com o banco de dados estabelecida com sucesso.");
      // Sincroniza os models recriando as tabelas
      return sequelize.sync({ force: true }); // ATENÇÃO: isso apaga todos os dados!
    })
    .then(() => {
      console.log("Tabelas sincronizadas (force: true).");
    })
    .catch(err => {
      console.error("Não foi possível conectar ao banco de dados:", err);
    });
});

module.exports = { app };
