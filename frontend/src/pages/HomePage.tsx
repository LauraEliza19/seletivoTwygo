// frontend/src/pages/HomePage.tsx
import React, { useEffect, useState } from 'react';
import {
  Box,
  Heading,
  Text,
  Button,
  Stack,
  Flex,
  SimpleGrid,
  IconButton,
  useToast,
  Spinner,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';

interface Course {
  id: number;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
}

const HomePage: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const toast = useToast();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/courses');
        if (!response.ok) {
          throw new Error('Erro ao carregar cursos');
        }
        const data = await response.json();
        setCourses(data);
      } catch (error) {
        toast({
          title: 'Erro',
          description: 'Não foi possível carregar os cursos',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [toast]);

  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:3000/api/courses/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Erro ao deletar curso');
      }
      setCourses((prevCourses) => prevCourses.filter((course) => course.id !== id));
      toast({
        title: 'Curso deletado',
        description: 'O curso foi deletado com sucesso',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: 'Erro',
        description: 'Não foi possível deletar o curso',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };
  

  if (loading) {
    return (
      <Flex align="center" justify="center" minHeight="100vh">
        <Spinner size="xl" />
      </Flex>
    );
  }

  return (
    <Box p={8}>
      <Flex justifyContent="space-between" alignItems="center" mb={6}>
        <Heading size="lg">Cursos Disponíveis</Heading>
        <Link to="/add-course">
          <Button colorScheme="teal">Adicionar Novo Curso</Button>
        </Link>
      </Flex>

      {courses.length === 0 ? (
        <Text fontSize="xl">Nenhum curso cadastrado ainda.</Text>
      ) : (
        <SimpleGrid columns={[1, 2, 3]} spacing={6}>
          {courses.map((course) => (
            <Box
                key={course.id}
                borderWidth="1px"
                borderRadius="lg"
                overflow="hidden"
                p={6}
                bg="white"
                boxShadow="md"
            >
              <Heading size="md" mb={4}>
                {course.title}
              </Heading>
              <Text mb={4}>{course.description}</Text>
              <Text fontWeight="bold">Início: {course.startDate}</Text>
              <Text fontWeight="bold">Fim: {course.endDate}</Text>

              <Flex mt={4} justifyContent="space-between">
                <Link to={`/edit/${course.id}`}>
                  <IconButton
                    icon={<EditIcon />}
                    aria-label="Editar curso"
                    colorScheme="blue"
                    mr={2}
                  />
                </Link>
                <IconButton
                  icon={<DeleteIcon />}
                  aria-label="Deletar curso"
                  colorScheme="red"
                  onClick={() => handleDelete(course.id)}
                />
              </Flex>
            </Box>
          ))}
        </SimpleGrid>
      )}
    </Box>
  );
};

export default HomePage;
