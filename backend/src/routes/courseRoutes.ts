import { Router } from 'express';
import { AppDataSource } from '../data-source'; // Certifique-se de que o caminho está correto
import { Course } from '../entity/course'; // Certifique-se de que o caminho está correto

const router = Router();

// Buscar todos os cursos
router.get('/courses', async (req, res) => {
  try {
    const courses = await AppDataSource.getRepository(Course).find();
    res.json(courses); // Retorna todos os cursos encontrados
  } catch (err) {
    console.error('Error fetching courses:', err); // Loga o erro
    res.status(500).json({ message: 'Error fetching courses' });
  }
});

// Buscar um curso por ID
router.get('/courses/:id', async (req, res) => {
  const id = parseInt(req.params.id, 10);
  try {
    const course = await AppDataSource.getRepository(Course).findOneBy({ id });
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    res.json(course); // Retorna o curso encontrado
  } catch (err) {
    console.error('Error fetching course:', err); // Loga o erro
    res.status(500).json({ message: 'Error fetching course' });
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
    res.status(201).json(result); // Retorna o curso criado com status 201
  } catch (err) {
    console.error('Error saving course:', err); // Loga o erro
    res.status(500).json({ message: 'Error saving course' });
  }
});

export default router;
