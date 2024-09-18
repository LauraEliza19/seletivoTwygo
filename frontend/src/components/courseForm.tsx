import React, { useState, useEffect } from 'react';
import { Box, Button, Input, FormLabel, VStack, useToast } from '@chakra-ui/react';
import { saveCourse, fetchCourseById } from '../utils/api';

interface CourseFormProps {
    courseId?: number; // Optional prop for editing
}

const CourseForm: React.FC<CourseFormProps> = ({ courseId }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [loading, setLoading] = useState(false);
    const toast = useToast();

    useEffect(() => {
        if (courseId) {
            const loadCourse = async () => {
                try {
                    const course = await fetchCourseById(courseId);
                    setTitle(course.title);
                    setDescription(course.description);
                    setStartDate(course.startDate);
                    setEndDate(course.endDate);
                } catch (err) {
                    toast({
                        title: "Error fetching course",
                        description: "Failed to fetch course details.",
                        status: "error",
                        duration: 5000,
                        isClosable: true,
                    });
                }
            };

            loadCourse();
        }
    }, [courseId, toast]);

    const handleSubmit = async () => {
        setLoading(true);
        try {
            await saveCourse({ title, description, startDate, endDate });
            toast({
                title: "Course saved",
                description: "Your course has been saved successfully.",
                status: "success",
                duration: 5000,
                isClosable: true,
            });
        } catch (err) {
            console.error('Save course error:', err);
            toast({
                title: "Error",
                description: "Failed to save course.",
                status: "error",
                duration: 5000,
                isClosable: true,
            });
        } finally {
            setLoading(false);
        }
    };



    return (
        <Box p={4} shadow="md" borderWidth="1px">
            <VStack spacing={4} align="start">
                <FormLabel htmlFor="title">Title</FormLabel>
                <Input
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter course title"
                />
                <FormLabel htmlFor="description">Description</FormLabel>
                <Input
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Enter course description"
                />
                <FormLabel htmlFor="startDate">Start Date</FormLabel>
                <Input
                    id="startDate"
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                />
                <FormLabel htmlFor="endDate">End Date</FormLabel>
                <Input
                    id="endDate"
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                />
                <Button
                    colorScheme="teal"
                    isLoading={loading}
                    onClick={handleSubmit}
                >
                    Save Course
                </Button>
            </VStack>
        </Box>
    );
};

export default CourseForm;
