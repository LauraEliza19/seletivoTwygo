import express from "express";
import cors from "cors";
import courseRoutes from "./routes/courseRoutes";
import { AppDataSource } from "./data-source";

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Rotas
app.use(courseRoutes);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
