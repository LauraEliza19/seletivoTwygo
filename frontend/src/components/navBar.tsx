import React from 'react';
import { Box, Flex, Heading, Button } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <Flex as="nav" p={4} bg="teal.500" color="white" align="center" justify="center">
      <Heading size="lg">Gerenciamento de cursos</Heading>
    </Flex>
  );
};

export default Navbar;
