import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Heading, useToast } from '@chakra-ui/react';
import CourseForm from '../components/courseForm';
import { fetchCourses } from '../utils/api';

const EditCoursePage: React.FC = () => {
  const { courseId } = useParams<{ courseId?: string }>(); // `courseId` pode ser `undefined`
  const [id, setId] = useState<number | null>(null);
  const toast = useToast();

  useEffect(() => {
    if (courseId) {
      const loadCourse = async () => {
        try {
          const course = await fetchCourses();
          setId(course.id);
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

  if (id === null && courseId) {
    // Show a message or redirect if courseId is provided but course could not be fetched
    return <div>Loading...</div>;
  }

  return (
    <Container maxW="container.md" mt={4}>
      <Heading mb={4}>Edit Course</Heading>
      {id !== null && <CourseForm courseId={id} />}
    </Container>
  );
};

export default EditCoursePage;
