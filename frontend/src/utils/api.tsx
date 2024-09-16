const API_BASE_URL = 'http://localhost:3000/api'; 

export interface Course {
  id: number;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
}

// Função para buscar todos os cursos
export const fetchCourses = async (): Promise<Course[]> => {
  const response = await fetch(`${API_BASE_URL}/courses`);
  if (!response.ok) {
    throw new Error('Failed to fetch courses');
  }
  return response.json();
};

// Função para buscar um curso por ID
export const fetchCourseById = async (id: number): Promise<Course> => {
  const response = await fetch(`${API_BASE_URL}/courses/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch course');
  }
  return response.json();
};

// Função para salvar um curso
export const saveCourse = async (course: Omit<Course, 'id'>): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/courses`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(course),
  });

  if (!response.ok) {
    throw new Error('Failed to save course');
  }
};

// Função para atualizar um curso
export const updateCourse = async (id: number, course: Partial<Omit<Course, 'id'>>): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/courses/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(course),
  });

  if (!response.ok) {
    throw new Error('Failed to update course');
  }
};

// Função para excluir um curso
export const deleteCourse = async (id: number): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/courses/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Failed to delete course');
  }
};
