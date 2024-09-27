import express from 'express';
import cors from 'cors';
import router from './routes/courseRoutes'; // Supondo que suas rotas estejam em 'router.ts'
import { AppDataSource } from './data-source';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { Course } from './entity/course';

// Inicializar a aplicação Express
const app = express();

// Inicializar a conexão com o banco de dados via TypeORM
AppDataSource.initialize()
  .then(() => {
    console.log('Banco de dados conectado com sucesso!');
  })
  .catch((error) => console.error('Erro ao conectar com o banco de dados:', error));

// Middleware para habilitar CORS
app.use(cors());

// Middleware para interpretar requisições JSON
app.use(express.json());

// Middleware para interpretar requisições URL-encoded
app.use(express.urlencoded({ extended: true }));

// Configuração do Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, '../uploads/courses/videos');
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 100 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const filetypes = /mp4|mov|avi/;
    const mimetype = filetypes.test(file.mimetype);
    if (mimetype) {
      cb(null, true);
    } else {
      cb(new Error('Tipo de arquivo não permitido'));
    }
  }
});

// Rota para upload de vídeos com o Multer
app.post('/api/courses', upload.array('videos', 5), async (req, res) => {
  console.log('Corpo da requisição recebido no backend:', req.body);

  const { title, description, startDate, endDate } = req.body;

  if (!title || !description || !startDate || !endDate) {
    console.error('Campos faltando:', { title, description, startDate, endDate });
    return res.status(400).json({ message: 'Todos os campos são obrigatórios' });
  }

  // Supondo que você tenha a entidade Course configurada corretamente
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

// Iniciar o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
