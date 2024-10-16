import { setupWorker } from 'msw';
import { handlers } from './handlers';

// Configura o worker com os handlers
export const worker = setupWorker(...handlers);
