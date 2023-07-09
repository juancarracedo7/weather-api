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

const PORT = process.env.PORT || 3001;

const connect = async () => {
  console.log("Table created");
};

// Iniciar el servidor
async function startServer() {
  try {
    await db.sync({ force: false });
    console.log("Conexión exitosa a la base de datos");
    await connect();
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en el puerto ${PORT}`);
    });
  } catch (error) {
    console.error("Error al conectar a la base de datos:", error);
  }
}

startServer();
