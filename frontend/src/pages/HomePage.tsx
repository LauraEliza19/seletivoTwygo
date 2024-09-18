// frontend/src/pages/HomePage.tsx
import React, { useEffect, useState } from 'react';
import { Box, Heading, Text, Stack } from '@chakra-ui/react';

interface Course {
  id: number;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
}

const HomePage: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch('http://localhost:3002/api/courses');
        
        if (!response.ok) {
          throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }
  
        const data = await response.json();
        setCourses(data);
      } catch (err: any) {
        console.error("Error fetching courses:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
  
    fetchCourses();
  }, []);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>Error: {error}</Text>;
  }

  return (
    <Box>
      <Heading as="h1" mb={6}>Courses</Heading>
      <Stack spacing={4}>
        {courses.length > 0 ? (
          courses.map((course) => (
            <Box key={course.id} p={5} shadow="md" borderWidth="1px">
              <Heading fontSize="xl">{course.title}</Heading>
              <Text mt={4}>{course.description}</Text>
              <Text mt={2}>
                <strong>Start Date:</strong> {course.startDate}
              </Text>
              <Text mt={2}>
                <strong>End Date:</strong> {course.endDate}
              </Text>
            </Box>
          ))
        ) : (
          <Text>No courses available</Text>
        )}
      </Stack>
    </Box>
  );
};

export default HomePage;
