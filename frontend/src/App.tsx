//frontend\src\App.tsx
import React from 'react';
import { Box } from '@chakra-ui/react';
import Navbar from './components/navBar'; // Verifique se o caminho está correto
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AddCoursePage from './pages/AddCoursePage';
import EditCoursePage from './pages/EditCoursePage';
import HomePage from './pages/HomePage'; // Corrija o caminho se necessário

const App: React.FC = () => {
  return (
    <Router>
      <Box minHeight="100vh" display="flex" flexDirection="column">
        <Navbar />
        <Box flex="1" p={4}>
          <Routes>
            <Route path="/add-course" element={<AddCoursePage />} />
            <Route path="/edit/:courseId" element={<EditCoursePage />} />
            <Route path="/" element={<HomePage />} /> {/* Certifique-se de que a página HomePage está correta */}
          </Routes>
        </Box>
      </Box>
    </Router>
  );
};

export default App;
