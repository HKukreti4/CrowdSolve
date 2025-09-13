import React from 'react';

function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-300 py-4 text-center">
      <p>&copy; {new Date().getFullYear()} CrowdSolve. All rights reserved.</p>
    </footer>
  );
}

export default Footer;
