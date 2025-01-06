import React, { useState } from "react";
import { PDFDocument } from "pdf-lib";

const MergePDF = () => {
  const [pdfFiles, setPdfFiles] = useState([]);
  const [error, setError] = useState("");

  const handleFileUpload = (e) => {
    setPdfFiles(Array.from(e.target.files));
    setError("");
  };

  const mergePDFs = async () => {
    if (pdfFiles.length < 2) {
      setError("Please upload at least two PDF files to merge.");
      return;
    }
    setError("");

    try {
      const mergedPdf = await PDFDocument.create();

      for (const file of pdfFiles) {
        const fileData = await file.arrayBuffer();
        const pdfToMerge = await PDFDocument.load(fileData);
        const copiedPages = await mergedPdf.copyPages(
          pdfToMerge,
          pdfToMerge.getPageIndices()
        );
        copiedPages.forEach((page) => mergedPdf.addPage(page));
      }

      const mergedPdfBytes = await mergedPdf.save();
      const blob = new Blob([mergedPdfBytes], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = "merged.pdf";
      link.click();

      URL.revokeObjectURL(url);
      setPdfFiles([]);
    } catch (err) {
      setError("An error occurred while merging the PDFs.");
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen p-8 bg-gray-100 text-gray-900">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">Merge PDFs</h1>

        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4">
            <p>{error}</p>
          </div>
        )}

        <div className="mb-6">
          <input
            type="file"
            accept="application/pdf"
            multiple
            onChange={handleFileUpload}
            className="block w-full p-2 border rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900"
          />
          {pdfFiles.length > 0 && (
            <p className="mt-4">
              <strong>Selected Files:</strong>{" "}
              {pdfFiles.map((file, index) => (
                <span key={index} className="text-blue-600">
                  {file.name}
                  {index < pdfFiles.length - 1 ? ", " : ""}
                </span>
              ))}
            </p>
          )}
        </div>

        <button
          onClick={mergePDFs}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition duration-300"
        >
          Merge PDFs
        </button>
      </div>
    </div>
  );
};

export default MergePDF;
