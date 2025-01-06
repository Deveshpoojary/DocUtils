import React, { useState } from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { FiFileText, FiImage, FiFile } from "react-icons/fi";

const PDFConverter = () => {
  const [text, setText] = useState("");
  const [imageFiles, setImageFiles] = useState([]);
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");

  // Text to PDF
  const convertTextToPDF = () => {
    if (!text.trim()) {
      setError("Please enter text to convert.");
      return;
    }
    setError("");
    const doc = new jsPDF();
    doc.text(text, 10, 10);
    doc.save("text.pdf");
    setText("");
  };

  // Image to PDF
  const convertImagesToPDF = async () => {
    if (imageFiles.length === 0) {
      setError("Please upload images to convert.");
      return;
    }
    setError("");
  
    const doc = new jsPDF();
    const promises = imageFiles.map(
      (imageFile) =>
        new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = (e) => resolve(e.target.result);
          reader.onerror = (err) => reject(err);
          reader.readAsDataURL(imageFile);
        })
    );
  
    try {
      const imageData = await Promise.all(promises);
  
      imageData.forEach((dataUrl, index) => {
        if (index > 0) doc.addPage();
        doc.addImage(dataUrl, "JPEG", 15, 40, 180, 160);
      });
  
      doc.save("images.pdf");
    } catch (error) {
      setError("An error occurred while converting images to PDF.");
    }
  };
  

  const handleImageUpload = (e) => {
    setImageFiles([...e.target.files]);
    setError("");
  };

  // Convert Word or text file to PDF
  const convertFileToPDF = () => {
    if (!file) {
      setError("Please upload a Word or text file to convert.");
      return;
    }
    setError("");

    const reader = new FileReader();
    reader.onload = (e) => {
      const doc = new jsPDF();
      doc.text(e.target.result, 10, 10);
      doc.save("file.pdf");
    };

    if (file.type === "text/plain") {
      reader.readAsText(file);
    } else if (
      file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      reader.readAsArrayBuffer(file);
    }
  };

  const handleFileUpload = (e) => {
    setFile(e.target.files[0]);
    setError("");
  };

  return (
    <div className="min-h-screen lg:p-8 md:p-8 sm:p-8 p-4 bg-gray-100 text-gray-900">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-center">PDF Converter</h1>

        {/* Error Message */}
        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4">
            <p>{error}</p>
          </div>
        )}

        {/* Text to PDF Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <FiFileText className="mr-2" /> Convert Text to PDF
          </h2>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={4}
            placeholder="Enter text here..."
            className="w-full p-2 border rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900 mb-4"
          />
          <button
            onClick={convertTextToPDF}
            className="bg-blue-500 text-white px-4 py-2 rounded flex items-center"
          >
            Convert to PDF
          </button>
        </div>

        {/* Two Column Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Image to PDF Section */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4 flex items-center">
              <FiImage className="mr-2" /> Convert Images to PDF
            </h2>
            <input
              type="file"
              multiple
              onChange={handleImageUpload}
              className="mb-4"
            />
            <button
              onClick={convertImagesToPDF}
              className="bg-green-500 text-white px-4 py-2 rounded flex items-center mt-4 w-full"
            >
              Convert to PDF
            </button>
          </div>

          {/* Word or Text File to PDF Section */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4 flex items-center">
              <FiFile className="mr-2" /> Convert Word/Text File to PDF
            </h2>
            <input
              type="file"
              accept=".txt, .docx"
              onChange={handleFileUpload}
              className="mb-4"
            />
            <button
              onClick={convertFileToPDF}
              className="bg-purple-500 text-white px-4 py-2 rounded flex items-center w-full"
            >
              Convert to PDF
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PDFConverter;
