import React, { useState } from 'react';
import Textutils from './Pages/textutils';
import PDFConverter from './Pages/PDFConverter';
import ImageCompressor from './Pages/ImageCompressor';
import PDFSplitter from './Pages/PDFSplitter';
import TypeConverter from './Pages/TypeConverter'; // Import the new component
import { FiFileText, FiImage, FiFile, FiScissors, FiRepeat, FiMenu, FiX } from "react-icons/fi";

function App() {
  const [activeComponent, setActiveComponent] = useState('textutils');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Function to render the selected component
  const renderComponent = () => {
    switch (activeComponent) {
      case 'textutils':
        return <Textutils />;
      case 'pdfconverter':
        return <PDFConverter />;
      case 'imagecompressor':
        return <ImageCompressor />;
      case 'pdfsplitter':
        return <PDFSplitter />;
      case 'typeconverter':
        return <TypeConverter />;
      default:
        return <Textutils />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Top Navbar */}
      <div className="min-w-fit bg-gray-800 text-white p-4 flex items-center justify-between sm:hidden">
        <h1 className="text-xl font-bold">File Utilities</h1>
        <button
          className="text-white focus:outline-none"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          {isSidebarOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      {/* Main Content with Sidebar */}
      <div className="flex flex-1 relative">
        {/* Sidebar */}
        <div
          className={`w-64 fixed h-full bg-gray-800 text-white p-6 transform ${
            isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } sm:translate-x-0 transition-transform duration-300 z-50`}
        >
          <h2 className="text-xl font-bold mb-6">File Utilities</h2>
          <ul>
            <li
              className={`cursor-pointer p-4 mb-2 rounded ${activeComponent === 'textutils' ? 'bg-gray-700' : ''}`}
              onClick={() => {
                setActiveComponent('textutils');
                setIsSidebarOpen(false); // Close sidebar after selecting
              }}
            >
              <FiFileText className="inline-block mr-2" /> Text Utilities
            </li>
            <li
              className={`cursor-pointer p-4 mb-2 rounded ${activeComponent === 'pdfconverter' ? 'bg-gray-700' : ''}`}
              onClick={() => {
                setActiveComponent('pdfconverter');
                setIsSidebarOpen(false);
              }}
            >
              <FiFile className="inline-block mr-2" /> PDF Converter
            </li>
            <li
              className={`cursor-pointer p-4 mb-2 rounded ${activeComponent === 'imagecompressor' ? 'bg-gray-700' : ''}`}
              onClick={() => {
                setActiveComponent('imagecompressor');
                setIsSidebarOpen(false);
              }}
            >
              <FiImage className="inline-block mr-2" /> Image Compressor
            </li>
            <li
              className={`cursor-pointer p-4 mb-2 rounded ${activeComponent === 'pdfsplitter' ? 'bg-gray-700' : ''}`}
              onClick={() => {
                setActiveComponent('pdfsplitter');
                setIsSidebarOpen(false);
              }}
            >
              <FiScissors className="inline-block mr-2" /> PDF Splitter
            </li>
            <li
              className={`cursor-pointer p-4 mb-2 rounded ${activeComponent === 'typeconverter' ? 'bg-gray-700' : ''}`}
              onClick={() => {
                setActiveComponent('typeconverter');
                setIsSidebarOpen(false);
              }}
            >
              <FiRepeat className="inline-block mr-2" /> Type Converter
            </li>
          </ul>
        </div>

        {/* Main Content */}
        <div className="flex-1 sm:ml-64">
          {renderComponent()}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white text-center py-4 sm:absolute sm:bottom-0 sm:left-64 sm:right-0">
        Designed and developed by <a href="https://deveshpoojary.vercel.app/" className='font-bold'>Devesh G Poojary</a>
      </footer>
    </div>
  );
}

export default App;
