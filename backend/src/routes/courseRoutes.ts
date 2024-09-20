import { Router } from 'express';
import { AppDataSource } from '../data-source';
import { Course } from '../entity/course';

const router = Router();

// Buscar todos os cursos
router.get('/', async (req, res) => {
  try {
    const courses = await AppDataSource.getRepository(Course).find();
    res.json(courses); // Retorna todos os cursos encontrados
  } catch (err) {
    console.error('Error fetching courses:', err);
    res.status(500).json({ message: 'Error fetching courses' });
  }
});

// Buscar um curso por ID
router.get('/:id', async (req, res) => {
  const id = parseInt(req.params.id, 10);
  try {
    const course = await AppDataSource.getRepository(Course).findOneBy({ id });
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    res.json(course);
  } catch (err) {
    console.error('Error fetching course:', err);
    res.status(500).json({ message: 'Error fetching course' });
  }
});

// Criar um novo curso
router.post('/', async (req, res) => {
  const { title, description, startDate, endDate } = req.body;

  // Verificação de campos obrigatórios
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
    res.status(201).json(result); // Retorna o curso criado
  } catch (err) {
    console.error('Error saving course:', err);
    res.status(500).json({ message: 'Error saving course' });
  }
});

export default router;
