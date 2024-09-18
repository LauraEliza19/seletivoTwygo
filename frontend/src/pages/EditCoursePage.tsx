//frontend\src\pages\EditCoursePage.tsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Heading, useToast } from '@chakra-ui/react';
import CourseForm from '../components/courseForm';
import { fetchCourseById } from '../utils/api';
import { Course } from '../types'; // Importa o tipo Course corretamente

const EditCoursePage: React.FC = () => {
    const { courseId } = useParams<{ courseId?: string }>(); // `courseId` pode ser `undefined`
    const [course, setCourse] = useState<Course | null>(null); // Use o tipo Course corretamente
    const toast = useToast();

    useEffect(() => {
        if (!courseId) {
            toast({
              title: "Error",
              description: "Course ID is missing",
              status: "error",
              duration: 5000,
              isClosable: true,
            });
            return;
        }
          
        if (courseId) {
            const loadCourse = async () => {
                try {
                    const fetchedCourse = await fetchCourseById(parseInt(courseId, 10)); // Busca o curso pelo ID
                    setCourse(fetchedCourse); // Define o curso buscado
                } catch (err) {
                    toast({
                        title: "Error fetching course",
                        description: "Failed to fetch course details.",
                        status: "error",
                        duration: 5000,
                        isClosable: true,
                    });
                }
            };

            loadCourse();
        }
    }, [courseId, toast]);

    if (!course && courseId) {
        // Mostra uma mensagem ou redireciona se courseId for fornecido mas o curso não for encontrado
        return <div>Loading...</div>;
    }

    return (
        <Container maxW="container.md" mt={4}>
            <Heading mb={4}>Edit Course</Heading>
            {course && <CourseForm courseId={course.id} />}

        </Container>
    );
};

export default EditCoursePage;
