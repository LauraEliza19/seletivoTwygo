import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { ChakraProvider } from '@chakra-ui/react';
import { ToastProvider } from '@chakra-ui/toast';

// Inicia o worker antes de todos os testes
beforeAll(() => worker.start());

// Limpa os handlers após cada teste
afterEach(() => worker.resetHandlers());

// Para o worker após todos os testes
afterAll(() => worker.stop());

test('renders the list of courses', async () => {
  render(<HomePage />);
  
  // Testa se os cursos simulados aparecem na tela
  const course = await screen.findByText('Curso 1');
  expect(course).toBeInTheDocument();
});


// Simulando o servidor
const server = setupServer(
  rest.get('http://localhost:3000/api/courses', (req, res, ctx) => {
    return res(ctx.json([
      {
        id: 1,
        title: 'Curso de React',
        description: 'Aprenda React com projetos práticos',
        startDate: '2024-10-20',
        endDate: '2024-11-20',
      },
      {
        id: 2,
        title: 'Curso de TypeScript',
        description: 'Domine TypeScript no desenvolvimento de aplicações',
        startDate: '2024-10-15',
        endDate: '2024-11-15',
      },
    ]));
  })
);

// Configura o servidor antes de cada teste
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('HomePage Component', () => {
  test('should render loading spinner while fetching courses', () => {
    render(
      <ChakraProvider>
        <ToastProvider>
          <BrowserRouter>
            <HomePage />
          </BrowserRouter>
        </ToastProvider>
      </ChakraProvider>
    );
    const spinner = screen.getByRole('status');
    expect(spinner).toBeInTheDocument();
  });

  test('should display courses after fetching', async () => {
    render(
      <ChakraProvider>
        <ToastProvider>
          <BrowserRouter>
            <HomePage />
          </BrowserRouter>
        </ToastProvider>
      </ChakraProvider>
    );

    await waitFor(() => {
      const courseTitle = screen.getByText('Curso de React');
      expect(courseTitle).toBeInTheDocument();
    });

    const courseDescription = screen.getByText('Aprenda React com projetos práticos');
    expect(courseDescription).toBeInTheDocument();
  });

  test('should display error message on fetch failure', async () => {
    // Simular uma falha ao buscar os cursos
    server.use(
      rest.get('http://localhost:3000/api/courses', (req, res, ctx) => {
        return res(ctx.status(500));
      })
    );

    render(
      <ChakraProvider>
        <ToastProvider>
          <BrowserRouter>
            <HomePage />
          </BrowserRouter>
        </ToastProvider>
      </ChakraProvider>
    );

    await waitFor(() => {
      const errorMessage = screen.getByText('Não foi possível carregar os cursos');
      expect(errorMessage).toBeInTheDocument();
    });
  });
});
