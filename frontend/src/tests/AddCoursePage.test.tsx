import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import AddCoursePage from '../pages/AddCoursePage';
import { ChakraProvider } from '@chakra-ui/react';
import { ToastProvider } from '@chakra-ui/toast';
import { saveCourse } from '../utils/api';

// Mock da função saveCourse
jest.mock('../utils/api', () => ({
  saveCourse: jest.fn(),
}));

describe('AddCoursePage', () => {
  const mockNavigate = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should render form fields', () => {
    render(
      <ChakraProvider>
        <ToastProvider>
          <BrowserRouter>
            <AddCoursePage />
          </BrowserRouter>
        </ToastProvider>
      </ChakraProvider>
    );

    // Verifica se os campos do formulário estão presentes
    expect(screen.getByLabelText(/título/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/descrição/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/data de início/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/data de término/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/upload de vídeos/i)).toBeInTheDocument();
  });

  test('should submit the form successfully', async () => {
    (saveCourse as jest.Mock).mockResolvedValueOnce(true);

    render(
      <ChakraProvider>
        <ToastProvider>
          <BrowserRouter>
            <AddCoursePage />
          </BrowserRouter>
        </ToastProvider>
      </ChakraProvider>
    );

    // Preenche o formulário
    fireEvent.change(screen.getByLabelText(/título/i), { target: { value: 'Novo Curso' } });
    fireEvent.change(screen.getByLabelText(/descrição/i), { target: { value: 'Descrição do Curso' } });
    fireEvent.change(screen.getByLabelText(/data de início/i), { target: { value: '2024-10-20' } });
    fireEvent.change(screen.getByLabelText(/data de término/i), { target: { value: '2024-11-20' } });

    const file = new File(['video content'], 'video.mp4', { type: 'video/mp4' });
    const input = screen.getByLabelText(/upload de vídeos/i) as HTMLInputElement;
    fireEvent.change(input, { target: { files: [file] } });

    // Submete o formulário
    fireEvent.click(screen.getByText(/salvar curso/i));

    await waitFor(() => {
      expect(saveCourse).toHaveBeenCalledTimes(1);
      expect(saveCourse).toHaveBeenCalledWith(expect.any(FormData));
    });
  });

  test('should show error message on submit failure', async () => {
    (saveCourse as jest.Mock).mockRejectedValueOnce(new Error('Erro ao salvar curso'));

    render(
      <ChakraProvider>
        <ToastProvider>
          <BrowserRouter>
            <AddCoursePage />
          </BrowserRouter>
        </ToastProvider>
      </ChakraProvider>
    );

    // Preenche o formulário
    fireEvent.change(screen.getByLabelText(/título/i), { target: { value: 'Novo Curso' } });
    fireEvent.change(screen.getByLabelText(/descrição/i), { target: { value: 'Descrição do Curso' } });
    fireEvent.change(screen.getByLabelText(/data de início/i), { target: { value: '2024-10-20' } });
    fireEvent.change(screen.getByLabelText(/data de término/i), { target: { value: '2024-11-20' } });

    // Submete o formulário
    fireEvent.click(screen.getByText(/salvar curso/i));

    await waitFor(() => {
      expect(saveCourse).toHaveBeenCalledTimes(1);
      expect(screen.getByText(/erro ao adicionar curso/i)).toBeInTheDocument();
    });
  });
});
