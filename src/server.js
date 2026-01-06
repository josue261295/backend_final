import express from "express";
import { db } from "./config/db.js";
import morgan from "morgan";
import routes from "./routes/index.routes.js";
import "./models/index.js";
import cors from "cors";
import { corsConfig } from "./config/cors.js";

async function conectDB() {
  try {
    await db.authenticate();
    db.sync();
    console.log("conexion a la base de datos exitosa");
  } catch (error) {
    console.log("error de conexion a la base de datos:", error.message);
  }
}

conectDB();

//creamos la aplicacion en express con dode
const app = express();

app.use(cors(corsConfig));

//manejar archivos json API REST
app.use(express.json());
app.use(morgan("dev"));

app.use("/api", routes);

export default app;
