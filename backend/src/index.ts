import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import courseRoutes from './routes/courseRoutes';

const app = express();

// Corrigir o valor de origin para 'http://localhost:3002'
const corsOptions = {
  origin: 'http://localhost:3002', // frontend rodando na porta 3002
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
// Interface para Curso
interface Course {
  id?: number;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
}

// Exemplo de armazenamento em memória
let courses: Course[] = [];

// Rota para criar um novo curso
app.post('/api/courses', (req, res) => {
  const { title, description, startDate, endDate } = req.body;

  if (!title || !description || !startDate || !endDate) {
    return res.status(400).json({ message: 'Todos os campos são obrigatórios' });
  }

  const newCourse: Course = {
    id: courses.length + 1,
    title,
    description,
    startDate,
    endDate,
  };
  
  courses.push(newCourse);
  res.status(201).json(newCourse);
});

// Rota para listar todos os cursos
app.get('/api/courses', (req, res) => {
  res.json(courses);
});

// Rotas
app.use('/api/courses', courseRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

