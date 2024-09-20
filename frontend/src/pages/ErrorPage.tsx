import React from 'react';
import { Box, Heading, Text, Button } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const ErrorPage: React.FC = () => {
  return (
    <Box textAlign="center" py={10} px={6}>
      <Heading as="h2" size="xl" mb={6}>
        Something went wrong!
      </Heading>
      <Text fontSize="lg" mb={4}>
        The page you're looking for cannot be found or an error occurred.
      </Text>
      <Link to="/">
        <Button colorScheme="teal">Go Back Home</Button>
      </Link>
    </Box>
  );
};

export default ErrorPage;
