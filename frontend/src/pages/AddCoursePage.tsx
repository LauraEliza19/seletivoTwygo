import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, FormControl, FormLabel, Input, useToast } from '@chakra-ui/react';

const AddCoursePage: React.FC = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [videos, setVideos] = useState<FileList | null>(null);
  const toast = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('startDate', startDate);
    formData.append('endDate', endDate);

    if (videos) {
      for (let i = 0; i < videos.length; i++) {
        formData.append('videos', videos[i]);
      }
    }

    try {
      const response = await fetch('http://localhost:3000/api/courses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: formData,
      });

      if (response.ok) {
        toast({
          title: 'Curso adicionado com sucesso!',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
        navigate('/');
      } else {
        throw new Error('Falha ao adicionar curso');
      }
    } catch (error) {
      toast({
        title: 'Erro ao adicionar curso',
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      navigate('/error');
    }
  };

  return (
    <Box maxW="500px" mx="auto" mt={5}>
      <form onSubmit={handleSubmit}>
        <FormControl id="title" isRequired>
          <FormLabel>Título</FormLabel>
          <Input value={title} onChange={(e) => setTitle(e.target.value)} />
        </FormControl>

        <FormControl id="description" mt={4} isRequired>
          <FormLabel>Descrição</FormLabel>
          <Input value={description} onChange={(e) => setDescription(e.target.value)} />
        </FormControl>

        <FormControl id="startDate" mt={4} isRequired>
          <FormLabel>Data de Início</FormLabel>
          <Input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
        </FormControl>

        <FormControl id="endDate" mt={4} isRequired>
          <FormLabel>Data de Término</FormLabel>
          <Input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
        </FormControl>

        <FormControl id="videos" mt={4}>
          <FormLabel>Upload de Vídeos</FormLabel>
          <Input type="file" multiple onChange={(e) => setVideos(e.target.files)} />
        </FormControl>

        <Button colorScheme="teal" mt={4} type="submit">
          Salvar Curso
        </Button>
      </form>
    </Box>
  );
};

export default AddCoursePage;
