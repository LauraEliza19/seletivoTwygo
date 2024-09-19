// frontend/src/pages/AddCoursePage.tsx
import React, { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Heading,
  useToast,
  VStack,
  Flex,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const AddCoursePage: React.FC = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validações básicas
    if (!title || !description || !startDate || !endDate) {
      toast({
        title: 'Erro',
        description: 'Todos os campos são obrigatórios.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/api/courses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          description,
          startDate,
          endDate,
        }),
      });

      if (!response.ok) {
        throw new Error('Erro ao salvar o curso');
      }

      toast({
        title: 'Sucesso',
        description: 'Curso adicionado com sucesso!',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });

      // Redireciona para a página inicial após salvar
      navigate('/');
    } catch (error) {
      toast({
        title: 'Erro',
        description: 'Ocorreu um erro ao salvar o curso. Tente novamente.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Flex align="center" justify="center" minHeight="100vh" bg="gray.50" p={6}>
      <Box
        width="100%"
        maxWidth="600px"
        bg="white"
        p={8}
        borderRadius="md"
        boxShadow="md"
      >
        <Heading as="h1" size="lg" mb={6}>
          Adicionar Novo Curso
        </Heading>
        <form onSubmit={handleSubmit}>
          <VStack spacing={4}>
            <FormControl isRequired>
              <FormLabel>Título do Curso</FormLabel>
              <Input
                placeholder="Digite o título do curso"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Descrição</FormLabel>
              <Input
                placeholder="Digite a descrição do curso"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Data de Início</FormLabel>
              <Input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Data de Término</FormLabel>
              <Input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </FormControl>

            <Button
              type="submit"
              colorScheme="teal"
              width="100%"
              isLoading={isSubmitting}
            >
              Adicionar Curso
            </Button>
          </VStack>
        </form>
      </Box>
    </Flex>
  );
};

export default AddCoursePage;
