import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Box } from '@chakra-ui/react';
import Navbar from './components/navBar';
import HomePage from './pages/HomePage';
import AddCoursePage from './pages/AddCoursePage';
import EditCoursePage from './pages/EditCoursePage';

const App: React.FC = () => {
  return (
    <Router>
      <Box minHeight="100vh" display="flex" flexDirection="column">
        <Navbar />
        <Box flex="1" p={4}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/add-course" element={<AddCoursePage />} />
            <Route path="/edit-course/:courseId" element={<EditCoursePage />} />
          </Routes>
        </Box>
      </Box>
    </Router>
  );
};

export default App;
