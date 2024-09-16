import { Router } from "express";
import { AppDataSource } from "../data-source";
import { Course } from "../entity/course";

const router = Router();

// Buscar todos os cursos
router.get("/courses", async (req, res) => {
  const courses = await AppDataSource.getRepository(Course).find();
  res.json(courses);
});

// Criar um novo curso
router.post("/courses", async (req, res) => {
  const { title, description, startDate, endDate } = req.body;
  const course = new Course();
  course.title = title;
  course.description = description;
  course.startDate = startDate;
  course.endDate = endDate;

  await AppDataSource.getRepository(Course).save(course);
  res.status(201).json(course);
});

export default router;
