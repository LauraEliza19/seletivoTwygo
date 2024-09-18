import { Course } from '../types';

const API_BASE_URL = 'http://localhost:3000/api';

// Função para buscar todos os cursos
export const fetchCourses = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/courses`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch courses');
    }

    return await response.json();
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

// Função para buscar um curso pelo ID
export const fetchCourseById = async (id: number) => {
  try {
    const response = await fetch(`${API_BASE_URL}/courses/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch course');
    }

    return await response.json();
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

// Função para salvar um novo curso
export const saveCourse = async (courseData: Omit<Course, 'id'>) => {
    try {
      console.log('Payload enviado:', courseData);  // Verifique o payload
      const response = await fetch(`${API_BASE_URL}/courses`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(courseData),
      });
  
      if (!response.ok) {
        throw new Error('Failed to save course');
      }
  
      return await response.json();
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
};
