//frontend\src\components\courseList.tsx
import React, { useEffect, useState } from 'react';
import { Box, Text, Button, VStack, Spinner } from '@chakra-ui/react';
import { fetchCourses } from '../utils/api';

interface Course {
  id: number;
  title: string;
  description: string;
}

const CourseList: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadCourses = async () => {
      try {
        const data = await fetchCourses();
        setCourses(data);
      } catch (err) {
        setError('Failed to fetch courses');
      } finally {
        setLoading(false);
      }
    };

    loadCourses();
  }, []);

  if (loading) return <Spinner />;
  if (error) return <Text color="red.500">{error}</Text>;

  return (
    <VStack spacing={4} align="start">
      {courses.map((course) => (
        <Box key={course.id} p={4} shadow="md" borderWidth="1px">
          <Text fontSize="xl" fontWeight="bold">{course.title}</Text>
          <Text mt={2}>{course.description}</Text>
          <Button mt={4} colorScheme="teal" onClick={() => alert(`Edit course ${course.id}`)}>
            Edit
          </Button>
        </Box>
      ))}
    </VStack>
  );
};

export default CourseList;
