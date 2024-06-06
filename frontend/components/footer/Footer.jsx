import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white p-8">
      <div className="container mx-auto flex flex-col items-center justify-center">
        {/* Social Media Icons */}
        <div className="flex space-x-4 mb-4">
          <a href="#" className="text-gray-300 hover:text-white">
            <i className="fab fa-twitter fa-2x"></i>
          </a>
          <a href="#" className="text-gray-300 hover:text-white">
            <i className="fab fa-facebook-f fa-2x"></i>
          </a>
          <a href="#" className="text-gray-300 hover:text-white">
            <i className="fab fa-instagram fa-2x"></i>
          </a>
          <a href="#" className="text-gray-300 hover:text-white">
            <i className="fab fa-linkedin-in fa-2x"></i>
          </a>
        </div>

        {/* Copyright */}
        <p className="text-gray-300 text-sm mb-2">
          All rights reserved.
        </p>

        {/* Responsive Name and Copyright */}
        <div className="flex flex-col items-center sm:flex-row sm:justify-between">
          <p className="text-sm text-gray-300 mb-2 sm:mb-0">MediFlex Productions</p>
          <p className="text-sm text-gray-300">© {new Date().getFullYear()}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
