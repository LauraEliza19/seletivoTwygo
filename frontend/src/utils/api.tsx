// import { Course } from '../types';

const API_BASE_URL = 'http://localhost:3000/api';

// Função para buscar todos os cursos
export const fetchCourses = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/courses`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "Clear-Site-Data": "*"
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
                "Clear-Site-Data": "*"
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
export const saveCourse = async (course: { title: string; description: string; startDate: string; endDate: string }) => {
    const response = await fetch(`${API_BASE_URL}/courses`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            "Clear-Site-Data": "*"
            // Não adicione cabeçalhos desnecessários
        },
        body: JSON.stringify(course),
    });
    if (!response.ok) {
        throw new Error('Failed to save course');
    }
    return response.json();
};


