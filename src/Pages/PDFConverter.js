import React, { useState } from "react";
import jsPDF from "jspdf";
import 'jspdf-autotable'; // Optional for table/pdf structure
import { FiFileText, FiImage, FiFile } from "react-icons/fi";

const PDFConverter = () => {
  const [text, setText] = useState("");
  const [imageFiles, setImageFiles] = useState([]);
  const [file, setFile] = useState(null);

  // Text to PDF
  const convertTextToPDF = () => {
    const doc = new jsPDF();
    doc.text(text, 10, 10);
    doc.save("text.pdf");
    setText(""); // Clear text after saving to PDF
  };

  // Image to PDF
  const convertImagesToPDF = () => {
    if (imageFiles.length === 0) return;

    const doc = new jsPDF();
    imageFiles.forEach((imageFile, index) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (index > 0) doc.addPage();
        doc.addImage(e.target.result, 'JPEG', 15, 40, 180, 160); // Customize position/size
        if (index === imageFiles.length - 1) {
          doc.save("images.pdf");
        }
      };
      reader.readAsDataURL(imageFile);
    });
  };

  const handleImageUpload = (e) => {
    setImageFiles([...e.target.files]);
  };

  // Convert Word or text file to PDF
  const convertFileToPDF = () => {
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const doc = new jsPDF();
      doc.text(e.target.result, 10, 10);
      doc.save("file.pdf");
    };

    if (file.type === "text/plain") {
      reader.readAsText(file);
    } else if (file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
      // For docx files, you would need to parse it before using in jsPDF (could use libraries like mammoth.js)
      reader.readAsArrayBuffer(file);
      // Add further processing if required for Word files
    }
  };

  const handleFileUpload = (e) => {
    setFile(e.target.files[0]);
  };

  return (
    <div className="min-h-screen lg:p-8 md:p-8 sm:p-8 p-4 bg-gray-100 text-gray-900">
      <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-4">PDF Converter</h2>

      {/* Text to PDF */}
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={4}
        placeholder="Enter text to convert to PDF"
        className="w-full p-2 border rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900 mb-4"
      />
      <button
        onClick={convertTextToPDF}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4 flex items-center"
      >
        <FiFileText className="mr-2" /> Convert Text to PDF
      </button>

      {/* Image to PDF */}
      <input type="file" multiple onChange={handleImageUpload} className="mb-4" />
      <button
        onClick={convertImagesToPDF}
        className="bg-green-500 text-white px-4 py-2 rounded flex items-center mb-4"
      >
        <FiImage className="mr-2" /> Convert Images to PDF
      </button>

      {/* Word or Text file to PDF */}
      <input type="file" accept=".txt, .docx" onChange={handleFileUpload} className="mb-4" />
      <button
        onClick={convertFileToPDF}
        className="bg-purple-500 text-white px-4 py-2 rounded flex items-center"
      >
        <FiFile className="mr-2" /> Convert Word/Text to PDF
      </button>
      </div>
    </div>
  );
};

export default PDFConverter;
