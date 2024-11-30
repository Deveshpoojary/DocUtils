import React, { useState } from "react";

const TypeConverter = () => {
  const [selectedFeature, setSelectedFeature] = useState("");
  const [file, setFile] = useState(null);
  const [convertedFile, setConvertedFile] = useState(null);
  const [error, setError] = useState("");

  const handleFeatureChange = (e) => {
    setSelectedFeature(e.target.value);
    setConvertedFile(null);
    setError("");
  };

  const handleFileUpload = (e) => {
    setFile(e.target.files[0]);
    setConvertedFile(null);
    setError("");
  };

  const handleConvert = () => {
    if (!file) {
      setError("Please upload a file to convert.");
      return;
    }

    switch (selectedFeature) {
      case "jpgToPng":
        validateFileType(file, ["image/jpeg"], () => convertImageFormat(file, "image/png"));
        break;
      case "pngToJpg":
        validateFileType(file, ["image/png"], () => convertImageFormat(file, "image/jpeg"));
        break;
      case "textToPdf":
        validateFileType(file, ["text/plain"], () => convertTextToPDF(file));
        break;
      case "pdfToText":
        validateFileType(file, ["application/pdf"], () => alert("PDF to Text conversion requires server-side support."));
        break;
      case "jpegToBmp":
        validateFileType(file, ["image/jpeg"], () => convertImageFormat(file, "image/bmp"));
        break;
      case "pngToGif":
        validateFileType(file, ["image/png"], () => convertImageFormat(file, "image/gif"));
        break;
      case "csvToJson":
        validateFileType(file, ["text/csv"], () => convertCSVToJSON(file));
        break;
      case "jsonToCsv":
        validateFileType(file, ["application/json"], () => convertJSONToCSV(file));
        break;
      default:
        setError("Please select a valid conversion feature.");
    }
  };

  const validateFileType = (file, validTypes, callback) => {
    if (!validTypes.includes(file.type)) {
      setError(`Invalid file type. Expected one of: ${validTypes.join(", ")}`);
      return;
    }
    callback();
  };

  const convertImageFormat = (file, targetFormat) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);
        canvas.toBlob(
          (blob) => {
            const convertedBlob = new Blob([blob], { type: targetFormat });
            const url = URL.createObjectURL(convertedBlob);
            setConvertedFile(url);
          },
          targetFormat,
          1
        );
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  };

  const convertTextToPDF = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const textContent = e.target.result;
      const pdfWindow = window.open("");
      pdfWindow.document.write(
        `<html><head><title>Text to PDF</title></head><body>${textContent}</body></html>`
      );
      pdfWindow.document.close();
      pdfWindow.print();
    };
    reader.readAsText(file);
  };

  const convertCSVToJSON = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const rows = e.target.result.split("\n");
      const headers = rows[0].split(",");
      const json = rows.slice(1).map((row) => {
        const values = row.split(",");
        return headers.reduce((acc, header, index) => {
          acc[header] = values[index];
          return acc;
        }, {});
      });
      const jsonBlob = new Blob([JSON.stringify(json, null, 2)], { type: "application/json" });
      setConvertedFile(URL.createObjectURL(jsonBlob));
    };
    reader.readAsText(file);
  };

  const convertJSONToCSV = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const jsonData = JSON.parse(e.target.result);
      const headers = Object.keys(jsonData[0]).join(",");
      const rows = jsonData.map((obj) => Object.values(obj).join(",")).join("\n");
      const csvContent = [headers, ...rows].join("\n");
      const csvBlob = new Blob([csvContent], { type: "text/csv" });
      setConvertedFile(URL.createObjectURL(csvBlob));
    };
    reader.readAsText(file);
  };

  return (
    <div className="min-h-screen p-8 bg-gray-100 text-gray-900">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Type Converter</h1>

        <div className="mb-4">
          <label className="block font-semibold mb-2">Select Conversion Type:</label>
          <select
            value={selectedFeature}
            onChange={handleFeatureChange}
            className="w-full p-2 border rounded-lg"
          >
            <option value="">-- Select a Feature --</option>
            <option value="jpgToPng">JPG to PNG</option>
            <option value="pngToJpg">PNG to JPG</option>
            <option value="textToPdf">Text to PDF</option>
            <option value="pdfToText">PDF to Text</option>
            <option value="jpegToBmp">JPEG to BMP</option>
            <option value="pngToGif">PNG to GIF</option>
            <option value="csvToJson">CSV to JSON</option>
            <option value="jsonToCsv">JSON to CSV</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block font-semibold mb-2">Upload File:</label>
          <input
            type="file"
            onChange={handleFileUpload}
            className="w-full p-2 border rounded-lg"
          />
        </div>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <button
          onClick={handleConvert}
          className="bg-blue-500 hover:bg-blue-600 text-white rounded-lg px-4 py-2"
        >
          Convert
        </button>

        {convertedFile && (
          <div className="mt-6">
            <p className="font-semibold mb-2">Converted File:</p>
            <a
              href={convertedFile}
              download="converted_file"
              className="text-blue-600 underline"
            >
              Download Converted File
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default TypeConverter;
