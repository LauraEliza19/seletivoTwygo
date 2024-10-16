import { rest } from 'msw';

export const handlers = [
  rest.get('http://localhost:3000/api/courses', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([
        { id: 1, title: 'Curso 1', description: 'Descrição do Curso 1', startDate: '2024-10-01', endDate: '2024-12-01' },
        { id: 2, title: 'Curso 2', description: 'Descrição do Curso 2', startDate: '2024-11-01', endDate: '2024-12-15' },
      ])
    );
  }),
];
