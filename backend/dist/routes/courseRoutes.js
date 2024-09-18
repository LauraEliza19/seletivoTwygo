"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//backend\src\routes\courseRoutes.ts
const express_1 = require("express");
const data_source_1 = require("../data-source"); // Certifique-se de que o caminho está correto
const course_1 = require("../entity/course"); // Certifique-se de que o caminho está correto
const router = (0, express_1.Router)();
// Buscar todos os cursos
// Buscar um curso por ID
router.get('/courses/:id', async (req, res) => {
    const id = parseInt(req.params.id, 10);
    try {
        const course = await data_source_1.AppDataSource.getRepository(course_1.Course).findOneBy({ id });
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }
        res.json(course);
    }
    catch (err) {
        res.status(500).json({ message: 'Error fetching course' });
    }
});
router.get('/courses', async (req, res) => {
    try {
        const courses = await data_source_1.AppDataSource.getRepository(course_1.Course).find();
        res.json(courses);
    }
    catch (err) {
        res.status(500).json({ message: 'Error fetching courses' });
    }
});
// Criar um novo curso
router.post('/courses', async (req, res) => {
    const { title, description, startDate, endDate } = req.body;
    if (!title || !description || !startDate || !endDate) {
        return res.status(400).json({ message: 'All fields are required' });
    }
    const course = new course_1.Course();
    course.title = title;
    course.description = description;
    course.startDate = startDate;
    course.endDate = endDate;
    try {
        const result = await data_source_1.AppDataSource.getRepository(course_1.Course).save(course);
        res.status(201).json(result);
    }
    catch (err) {
        res.status(500).json({ message: 'Error saving course' });
    }
});
exports.default = router;
