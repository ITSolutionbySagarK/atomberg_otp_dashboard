import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import './theme.css';
import Reservations from './components/Reservations/Reservations';

// Import your page components
const About = () => <h1>About Us</h1>;
const Contact = () => <h1>Contact Us</h1>;

const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Reservations />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
