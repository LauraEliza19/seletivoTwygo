import React from 'react';
import { Box } from '@chakra-ui/react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/navBar'; // Verifique o caminho correto
import AddCoursePage from './pages/AddCoursePage';
import EditCoursePage from './pages/EditCoursePage';
import HomePage from './pages/HomePage';
import ErrorPage from './pages/ErrorPage'; // Adicionando página de erro

const App: React.FC = () => {
  return (
    <Router>
      <Box minHeight="100vh" display="flex" flexDirection="column">
        <Navbar />
        <Box flex="1" p={4}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/add-course" element={<AddCoursePage />} />
            <Route path="/edit/:courseId" element={<EditCoursePage />} />
            <Route path="/error" element={<ErrorPage />} /> {/* Página de erro */}
          </Routes>
        </Box>
      </Box>
    </Router>
  );
};

export default App;
