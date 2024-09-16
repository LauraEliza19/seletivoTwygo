import React from 'react';
import { Container, Heading } from '@chakra-ui/react';
import CourseList from '../components/courseList';

const HomePage: React.FC = () => {
  return (
    <Container maxW="container.md" mt={4}>
      <Heading mb={4}>Active Courses</Heading>
      <CourseList />
    </Container>
  );
};

export default HomePage;
