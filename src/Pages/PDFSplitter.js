import React, { useState } from "react";
import { PDFDocument } from "pdf-lib";

const PDFSplitter = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [splitPages, setSplitPages] = useState({ start: "", end: "" });

  const handleFileUpload = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const splitPDF = async () => {
    if (!selectedFile) return;

    const fileArrayBuffer = await selectedFile.arrayBuffer();
    const pdfDoc = await PDFDocument.load(fileArrayBuffer);
    const { start, end } = splitPages;

    if (start && end) {
      const newPdfDoc = await PDFDocument.create();
      const pages = await newPdfDoc.copyPages(pdfDoc, Array.from({ length: end - start + 1 }, (_, i) => i + Number(start) - 1));
      pages.forEach(page => newPdfDoc.addPage(page));
      const pdfBytes = await newPdfDoc.save();
      downloadSplitPDF(pdfBytes);
    }
  };

  const downloadSplitPDF = (pdfBytes) => {
    const blob = new Blob([pdfBytes], { type: "application/pdf" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "split_pdf.pdf";
    link.click();
  };

  return (
    <div className="min-h-screen lg:p-8 md:p-8 sm:p-8 p-4 bg-gray-100 text-gray-900">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-4">PDF Splitter</h2>
        <input type="file" onChange={handleFileUpload} className="mb-4" />
        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="number"
            value={splitPages.start}
            onChange={(e) => setSplitPages({ ...splitPages, start: e.target.value })}
            placeholder="Start Page"
            className="border p-2 rounded border-gray-500 flex-1"
          />
          <input
            type="number"
            value={splitPages.end}
            onChange={(e) => setSplitPages({ ...splitPages, end: e.target.value })}
            placeholder="End Page"
            className="border p-2 rounded border-gray-500 flex-1"
          />
        </div>
        <button
          onClick={splitPDF}
          className="bg-red-500 text-white px-4 py-2 rounded mt-4"
        >
          Split PDF
        </button>
      </div>
    </div>
  );
};

export default PDFSplitter;
