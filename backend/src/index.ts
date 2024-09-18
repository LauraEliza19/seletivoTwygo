import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();
const PORT = 3000;

// Middleware CORS para permitir requisições do frontend
app.use(cors({
  origin: 'http://localhost', // Alterar se necessário para o domínio do frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Backend rodando na porta ${PORT}`);
});
