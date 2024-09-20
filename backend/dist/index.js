"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const app = (0, express_1.default)();
const PORT = 3000;
// Middleware CORS para permitir requisições do frontend
app.use((0, cors_1.default)({
    origin: '*', // Alterar se necessário para o domínio do frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
// Exemplo de armazenamento em memória
let courses = [];
// Rota para criar um novo curso
app.post('/api/courses', (req, res) => {
    const { title, description, startDate, endDate } = req.body;
    if (!title || !description || !startDate || !endDate) {
        return res.status(400).json({ message: 'Todos os campos são obrigatórios' });
    }
    const newCourse = {
        id: courses.length + 1,
        title,
        description,
        startDate,
        endDate,
    };
    courses.push(newCourse);
    res.status(201).json(newCourse);
});
// Rota para listar todos os cursos
app.get('/api/courses', (req, res) => {
    res.json(courses);
});
// Iniciar o servidor
app.listen(PORT, () => {
    console.log(`Backend rodando na porta ${PORT}`);
});
