import { Course } from './types.ts';
const API_BASE_URL = 'http://localhost:3000/api';

export const saveCourse = async (courseData: Omit<Course, 'id'>) => {
  try {
    const response = await fetch(`${API_BASE_URL}/courses`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Verifique se há outros cabeçalhos aqui
      },
      body: JSON.stringify(courseData),
    });

    if (!response.ok) {
      throw new Error('Failed to save course');
    }

    return await response.json();
  } catch (error) {
    console.error('Error:', error);
  }
};

export const fetchCourses = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/courses`);

    if (!response.ok) {
      throw new Error('Failed to fetch courses');
    }

    return await response.json();
  } catch (error) {
    console.error('Error:', error);
  }
};
