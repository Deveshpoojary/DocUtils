import React, { useState } from "react";
import { FiCopy, FiDownload } from "react-icons/fi";

const TextConverter = () => {
  const [inputText, setInputText] = useState("");
  const [convertedText, setConvertedText] = useState("");
  const [wordCount, setWordCount] = useState(0);
  const [charCount, setCharCount] = useState(0);

  const handleInputChange = (e) => {
    const text = e.target.value;
    setInputText(text);
    setWordCount(text.trim().split(/\s+/).filter(Boolean).length);
    setCharCount(text.length);
    setConvertedText("");
  };

  const convertToLowercase = () => {
    setConvertedText(inputText.toLowerCase());
  };

  const convertToUppercase = () => {
    setConvertedText(inputText.toUpperCase());
  };

  const removeExtraSpaces = () => {
    setConvertedText(inputText.replace(/\s+/g, " ").trim());
  };

  const copyText = () => {
    navigator.clipboard.writeText(convertedText || inputText);
  };

  const downloadText = () => {
    const element = document.createElement("a");
    const file = new Blob([convertedText || inputText], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = "converted_text.txt";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="min-h-screen p-8 bg-gray-100 text-gray-900">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Text Converter</h1>
        </div>

        <textarea
          value={inputText}
          onChange={handleInputChange}
          rows={8}
          placeholder="Enter your text here..."
          className="w-full p-4 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900"
        />

        <div className="mt-4 flex flex-wrap gap-4">
          <button
            onClick={convertToLowercase}
            className="bg-blue-500 hover:bg-blue-600 text-white rounded-lg px-4 py-2 transition duration-300"
          >
            Lowercase
          </button>
          <button
            onClick={convertToUppercase}
            className="bg-green-500 hover:bg-green-600 text-white rounded-lg px-4 py-2 transition duration-300"
          >
            Uppercase
          </button>
          <button
            onClick={removeExtraSpaces}
            className="bg-purple-500 hover:bg-purple-600 text-white rounded-lg px-4 py-2 transition duration-300"
          >
            Remove Extra Spaces
          </button>
          <button
            onClick={copyText}
            className="bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg px-4 py-2 transition duration-300 flex items-center"
          >
            <FiCopy className="mr-2" /> Copy
          </button>
          <button
            onClick={downloadText}
            className="bg-red-500 hover:bg-red-600 text-white rounded-lg px-4 py-2 transition duration-300 flex items-center"
          >
            <FiDownload className="mr-2" /> Download
          </button>
        </div>

        <div className="mt-6">
          <p className="text-lg font-semibold mb-2">Text Statistics:</p>
          <p>Word Count: {wordCount}</p>
          <p>Character Count: {charCount}</p>
        </div>

        {convertedText && (
          <div className="mt-6">
            <p className="text-lg font-semibold mb-2">Converted Text:</p>
            <p className="p-4 rounded-lg bg-white shadow-md">{convertedText}</p>
          </div>
        )}

        <div className="mt-6">
          <p className="text-lg font-semibold mb-2">Text Preview:</p>
          <p className="p-4 rounded-lg bg-white shadow-md">
            {inputText || "Your text will appear here"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TextConverter;
