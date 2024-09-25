import { Router, Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { Course } from '../entity/course';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

const router = Router();

// Configuração do armazenamento do multer
const storage = multer.diskStorage({
  destination: (req: Request, file: Express.Multer.File, cb: (error: Error | null, destination: string) => void) => {
    // const courseId = req.body.courseId || 'default'; // Verifique o campo 'courseId'
    const uploadPath = path.join(__dirname, `../uploads/courses/videos`); // Ajustando o caminho
    
    // Verifica se a pasta existe antes de criar
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    
    cb(null, uploadPath);
  },
  filename: (req: Request, file: Express.Multer.File, cb: (error: Error | null, filename: string) => void) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// Configurar o multer
const upload = multer({
  storage: storage,
  limits: { fileSize: 100 * 1024 * 1024 }, // 100MB por arquivo
}).array('videos', 5); // Limite de 5 vídeos por upload

// Rota de criação de curso com upload de vídeos
// Rota de criação de curso com upload de vídeos
router.post('/api/courses', async (req: Request, res: Response) => {
  // console.log('Corpo da requisição recebido no backend:', req.body);

  
  // Prosseguir com o upload
  upload(req, res, async function (err: any) {
    if (err) {
      console.error('Erro no upload de arquivo:', err);
      return res.status(500).json({ message: 'Erro no upload de arquivo' });
    }
    
    const course = new Course();
    course.title = title;
    course.description = description;
    course.startDate = startDate;
    course.endDate = endDate;
    
    if (req.files) {
      const videos = (req.files as Express.Multer.File[]).map(file => file.path);
      course.videos = videos;
    }

    try {
      const result = await AppDataSource.getRepository(Course).save(course);
      res.status(201).json(result);
    } catch (err) {
      console.error('Erro ao salvar o curso:', err);
      res.status(500).json({ message: 'Erro ao salvar o curso' });
    }
  });
  
  const { title, description, startDate, endDate } = req.body;

  if (!title || !description || !startDate || !endDate) {
    console.error('Campos faltando:', { title, description, startDate, endDate });
    return res.status(400).json({ message: 'Todos os campos são obrigatórios' });
  }
});


export default router;
