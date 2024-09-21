import { Router, Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { Course } from '../entity/course';
import multer from 'multer';
import path from 'path';

const router = Router();
const fs = require('fs');

// Configuração do armazenamento do multer
const storage = multer.diskStorage({
  destination: (req: Request, file: Express.Multer.File, cb: (error: Error | null, destination: string) => void) => {
    const courseId = req.body.courseId || 'default'; // Pega o ID do curso da requisição
    const uploadPath = `uploads/courses/${courseId}/videos`; // Define a pasta onde os arquivos serão salvos

    // Cria a pasta se ela não existir
    fs.mkdirSync(uploadPath, { recursive: true });

    cb(null, uploadPath); // Define o caminho de destino
  },
  filename: (req: Request, file: Express.Multer.File, cb: (error: Error | null, filename: string) => void) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Define o nome do arquivo
  },
});

// Configurar o multer com limite de tamanho de arquivo
const upload = multer({
  storage: storage,
  limits: { fileSize: 100 * 1024 * 1024 } // Limite de 100MB
});

// Rota para criação de cursos com upload de vídeos
router.post('/api/courses', upload.array('videos'), async (req: Request, res: Response) => {
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
