import React, { useState } from "react";
import imageCompression from "browser-image-compression";

const ImageCompressor = () => {
  const [compressedFile, setCompressedFile] = useState(null);
  const [originalFile, setOriginalFile] = useState(null);

  const handleImageUpload = (e) => {
    setOriginalFile(e.target.files[0]);
  };

  const compressImage = async () => {
    if (!originalFile) return;

    const options = {
      maxSizeMB: 1, // Set the maximum size in MB
      maxWidthOrHeight: 1920,
      useWebWorker: true,
    };

    try {
      const compressedBlob = await imageCompression(originalFile, options);
      setCompressedFile(compressedBlob);
      const downloadUrl = URL.createObjectURL(compressedBlob);
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = "compressed_image.jpg";
      link.click();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen lg:p-8 md:p-8 sm:p-8 p-4 bg-gray-100 text-gray-900">
      <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-4">Image Compressor</h2>
      <input type="file" onChange={handleImageUpload} className="mb-4" />
      <button
        onClick={compressImage}
        className="bg-purple-500 text-white px-4 py-2 rounded"
      >
        Compress Image
      </button>
      {compressedFile && <p className="mt-4">Image compressed successfully!</p>}
      </div>
    </div>
  );
};

export default ImageCompressor;
