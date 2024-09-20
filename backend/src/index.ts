import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import courseRoutes from './routes/courseRoutes';

const app = express();

// Configurar CORS para permitir requisições do frontend
const corsOptions = {
  origin: 'http://localhost:3001', // frontend rodando na porta 3002
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

// Usar as rotas do curso
app.use('/api/courses', courseRoutes);

// Inicializar o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
