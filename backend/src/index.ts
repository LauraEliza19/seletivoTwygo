import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

// Inicializar o aplicativo Express
const app = express();
const PORT = 3000;

// Configuração do middleware
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: [
    'Content-Type',
    'Authorization',
    'Accept',
    'X-Requested-With',
    'X-CSRF-Token',
    'Access-Control-Allow-Headers'
  ],
}));
app.use(bodyParser.json({ limit: '400mb' }));
app.use(bodyParser.urlencoded({ limit: '400mb', extended: true }));

// Interface para Curso
interface Course {
  id?: number;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
}

// Dados de exemplo
let courses: Course[] = [];

// Rota para criar um novo curso
app.post('/api/courses', (req, res) => {
  try {
    console.log('Dados recebidos:', req.body);  
    const { title, description, startDate, endDate }: Course = req.body;

    if (!title || !description || !startDate || !endDate) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const newCourse: Course = { id: courses.length + 1, title, description, startDate, endDate };
    courses.push(newCourse);
    res.status(201).json(newCourse);
  } catch (error) {
    console.error('Erro ao salvar o curso:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Rota para obter todos os cursos ativos
app.get('/api/courses', (req, res) => {
  const now = new Date().toISOString();
  const activeCourses = courses.filter(course => course.endDate >= now);
  res.status(200).json(activeCourses);
});

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
