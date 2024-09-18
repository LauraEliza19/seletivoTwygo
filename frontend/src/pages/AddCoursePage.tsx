import React, { useState } from 'react';
import { Box, Button, FormControl, FormLabel, Input, useToast } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const AddCoursePage: React.FC = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const toast = useToast();
  const navigate = useNavigate();

    // No arquivo AddCoursePage.tsx
    const handleSubmit = async () => {
        try {
          const response = await fetch('http://localhost:3000/api/courses', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              title: 'Curso Exemplo',
              description: 'Descrição do curso',
              startDate: '2024-01-01',
              endDate: '2024-01-31',
            }),
          });
          
          if (!response.ok) {
            throw new Error('Erro ao salvar o curso');
          }
      
          const data = await response.json();
          console.log('Curso salvo com sucesso:', data);
        } catch (error) {
          console.error('Erro ao salvar o curso:', error);
        }
      };
      

  return (
    <Box p={4}>
      <form onSubmit={handleSubmit}>
        <FormControl id="title" mb={4} isRequired>
          <FormLabel>Title</FormLabel>
          <Input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </FormControl>
        <FormControl id="description" mb={4} isRequired>
          <FormLabel>Description</FormLabel>
          <Input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </FormControl>
        <FormControl id="startDate" mb={4} isRequired>
          <FormLabel>Start Date</FormLabel>
          <Input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </FormControl>
        <FormControl id="endDate" mb={4} isRequired>
          <FormLabel>End Date</FormLabel>
          <Input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </FormControl>
        <Button colorScheme="teal" type="submit">
          Add Course
        </Button>
      </form>
    </Box>
  );
};

export default AddCoursePage;
