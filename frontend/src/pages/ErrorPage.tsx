import React from 'react';
import { Box, Heading, Text, Button } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const ErrorPage: React.FC = () => {
  return (
    <Box textAlign="center" py={10} px={6}>
      <Heading as="h2" size="xl" mb={6}>
        Algo deu errado!
      </Heading>
      <Text fontSize="lg" mb={4}>
        A página que você está procurando está indisponível ou ocorreu um erro.
      </Text>
      <Link to="/">
        <Button colorScheme="teal">Voltar a página inicial</Button>
      </Link>
    </Box>
  );
};

export default ErrorPage;
