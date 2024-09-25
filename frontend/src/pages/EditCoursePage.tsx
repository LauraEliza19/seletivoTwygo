import React, { useEffect, useState } from 'react';
import { Box, Button, FormControl, FormLabel, Input, useToast } from '@chakra-ui/react';
import { useNavigate, useParams } from 'react-router-dom';

const EditCoursePage: React.FC = () => {
  const { courseId } = useParams();
  const [course, setCourse] = useState<any>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const toast = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    if (courseId) {
      fetch(`http://localhost:3000/api/courses/${courseId}`)
        .then((response) => response.json())
        .then((data) => {
          setCourse(data);
          setTitle(data.title);
          setDescription(data.description);
          setStartDate(data.startDate);
          setEndDate(data.endDate);
        })
        .catch((error) => console.error('Error fetching course:', error));
    }
  }, [courseId]);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  
    fetch(`${process.env.REACT_APP_API_URL}/api/courses/${courseId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, description, startDate, endDate }),
    })
      .then((response) => {
        if (response.ok) {
          toast({
            title: 'Course updated.',
            description: 'The course has been updated successfully.',
            status: 'success',
            duration: 5000,
            isClosable: true,
          });
          navigate('/');
        } else {
          throw new Error('Error updating course');
        }
      })
      .catch((error) => {
        toast({
          title: 'Error.',
          description: error.message,
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      });
  };
  

  if (!course) return <div>Loading...</div>;

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
          Update Course
        </Button>
      </form>
    </Box>
  );
};

export default EditCoursePage;
