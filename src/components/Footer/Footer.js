import React from 'react';

const Footer = () => {
  return (
    <footer className="py-3" style={{ backgroundColor: 'var(--bs-secondary)', color: 'var(--bs-light)' }}>
      <div className="container text-center">
        <p>
          &copy; 2024 My Website. Built with <span style={{ color: 'var(--bs-light)' }}>❤️</span>.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
