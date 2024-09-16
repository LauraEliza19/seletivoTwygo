import React from 'react';
import { Container, Heading } from '@chakra-ui/react';
import CourseForm from '../components/courseForm';

const AddCoursePage: React.FC = () => {
  return (
    <Container maxW="container.md" mt={4}>
      <Heading mb={4}>Add New Course</Heading>
      <CourseForm />
    </Container>
  );
};

export default AddCoursePage;
