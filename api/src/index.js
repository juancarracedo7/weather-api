const express = require("express");
const app = express();
const cors = require("cors");
const db = require("./database/index");


// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Rutas
app.use(require("./routes/index"));

// Sincronizar modelo con la base de datos

const { DB_PORT } = process.env;

const connect = async () => {
  console.log("Table created");
};

// Iniciar el servidor
async function startServer() {
  try {
    await db.sync({ force: false });
    console.log("Conexión exitosa a la base de datos");
    await connect();
    app.listen(DB_PORT, () => {
      console.log("Servidor en ejecución en el puerto 3001");
    });
  } catch (error) {
    console.error("Error al conectar a la base de datos:", error);
  }
}

startServer();
