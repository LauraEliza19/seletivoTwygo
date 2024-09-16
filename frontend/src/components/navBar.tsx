import React from 'react';
import { Box, Flex, Heading, Button } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <Flex as="nav" p={4} bg="teal.500" color="white" align="center" justify="space-between">
      <Heading size="lg">Course Management</Heading>
      <Box>
        <Link to="/">
          <Button colorScheme="teal" variant="outline" mr={4}>
            Home
          </Button>
        </Link>
        <Link to="/add-course">
          <Button colorScheme="teal" variant="outline">
            Add Course
          </Button>
        </Link>
      </Box>
    </Flex>
  );
};

export default Navbar;
