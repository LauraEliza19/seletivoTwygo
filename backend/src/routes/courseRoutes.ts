//backend\src\routes\courseRoutes.ts
import { Router } from 'express';
import { AppDataSource } from '../data-source'; // Certifique-se de que o caminho está correto
import { Course } from '../entity/course'; // Certifique-se de que o caminho está correto

const router = Router();

// Buscar todos os cursos
// Buscar um curso por ID
router.get('/courses/:id', async (req, res) => {
  const id = parseInt(req.params.id, 10);
  try {
    const course = await AppDataSource.getRepository(Course).findOneBy({ id });
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    res.json(course);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching course' });
  }
});


router.get('/courses', async (req, res) => {
  try {
    const courses = await AppDataSource.getRepository(Course).find();
    res.json(courses);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching courses' });
  }
});

// Criar um novo curso
router.post('/courses', async (req, res) => {
  const { title, description, startDate, endDate } = req.body;
  if (!title || !description || !startDate || !endDate) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const course = new Course();
  course.title = title;
  course.description = description;
  course.startDate = startDate;
  course.endDate = endDate;

  try {
    const result = await AppDataSource.getRepository(Course).save(course);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ message: 'Error saving course' });
  }
});


export default router;
