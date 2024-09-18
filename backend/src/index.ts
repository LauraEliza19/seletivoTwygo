//backend\src\index.ts

import express, { Request, Response } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();
const PORT = 4000;

// Interface para Curso
interface Course {
  id?: number;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
}

// Middleware
app.use(cors({
  origin: 'http://localhost:3000', // URL do frontend, ajuste conforme necessário
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

// Dados de exemplo
let courses: Course[] = [];

// Rota para criar um novo curso
app.post('/api/courses', (req: Request, res: Response) => {
  console.log('Dados recebidos:', req.body);

  // Definindo explicitamente o tipo de req.body como Course
  const { title, description, startDate, endDate }: Course = req.body as Course;

  if (!title || !description || !startDate || !endDate) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const newCourse: Course = { id: courses.length + 1, title, description, startDate, endDate };
  courses.push(newCourse);
  res.status(201).json(newCourse);
});

// Rota para obter todos os cursos ativos
app.get('/api/courses', (req: Request, res: Response) => {
  const now = new Date().toISOString();
  const activeCourses = courses.filter(course => course.endDate >= now);
  res.status(200).json(activeCourses);
});

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
