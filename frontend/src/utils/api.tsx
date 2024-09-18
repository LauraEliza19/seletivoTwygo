//frontend\src\utils\api.tsx
import { Course } from '../types';

const API_BASE_URL = 'http://backend:3000/api'; // 'backend' é o nome do serviço no docker-compose

// Função para buscar todos os cursos
export const fetchCourses = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/courses`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        });

        if (!response.ok) {
            throw new Error('Falha ao buscar cursos');
        }

        return await response.json();
    } catch (error) {
        console.error('Erro:', error);
        throw error;
    }
};

// Função para salvar um novo curso
export const saveCourse = async (course: { title: string; description: string; startDate: string; endDate: string }) => {
    try {
        const response = await fetch(`${API_BASE_URL}/courses`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(course),
        });

        if (!response.ok) {
            throw new Error('Falha ao salvar o curso');
        }

        return await response.json();
    } catch (error) {
        console.error('Erro:', error);
        throw error;
    }
};

// Função para buscar um curso pelo ID
export const fetchCourseById = async (id: number) => {
    try {
        const response = await fetch(`${API_BASE_URL}/courses/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
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


