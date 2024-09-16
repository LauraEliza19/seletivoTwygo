import express, { Request, Response } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();
const PORT = 3000;

// Middleware
app.use(cors()); // Permite solicitações de diferentes origens
app.use(bodyParser.json({ limit: '10mb' })); // Ajuste o limite do corpo da solicitação se necessário

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
app.post('/api/courses', (req: Request, res: Response) => {
  const { title, description, startDate, endDate }: Course = req.body;

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
