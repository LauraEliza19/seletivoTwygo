import { Router } from 'express';
import { AppDataSource } from '../data-source';
import { Course } from '../entity/course';
import multer from 'multer';
import path from 'path';

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
// router.post('/', async (req, res) => {
//   const { title, description, startDate, endDate } = req.body;

//   // Verificação de campos obrigatórios
//   if (!title || !description || !startDate || !endDate) {
//     return res.status(400).json({ message: 'All fields are required' });
//   }

//   const course = new Course();
//   course.title = title;
//   course.description = description;
//   course.startDate = startDate;
//   course.endDate = endDate;

//   try {
//     const result = await AppDataSource.getRepository(Course).save(course);
//     res.status(201).json(result); // Retorna o curso criado
//   } catch (err) {
//     console.error('Error saving course:', err);
//     res.status(500).json({ message: 'Error saving course' });
//   }
// });

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Define a pasta onde os arquivos serão salvos
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Define o nome do arquivo
  },
});

const upload = multer({ storage: storage });

// Criar um novo curso com upload de vídeo
router.post('/', upload.array('videos', 5), async (req, res) => {
  const { title, description, startDate, endDate } = req.body;

  if (!title || !description || !startDate || !endDate) {
    return res.status(400).json({ message: 'Todos os campos são obrigatórios' });
  }

  const course = new Course();
  course.title = title;
  course.description = description;
  course.startDate = startDate;
  course.endDate = endDate;

  if (req.files) {
    const videos = (req.files as Express.Multer.File[]).map(file => file.path);
    course.videos = videos; // Supondo que você tenha uma coluna 'videos' no banco de dados
  }

  try {
    const result = await AppDataSource.getRepository(Course).save(course);
    res.status(201).json(result); // Retorna o curso criado
  } catch (err) {
    console.error('Erro ao salvar o curso:', err);
    res.status(500).json({ message: 'Erro ao salvar o curso' });
  }
});


export default router;
