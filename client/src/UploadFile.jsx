import React, { useState } from 'react';

const UploadFile = () => {
  const [files, setFiles] = useState(null); // Use null initially
  const [message, setMessage] = useState("");

  // Handle file selection and update state
  const handleFileChange = (e) => {
    setFiles(e.target.files);
    for (let tmp of e.target.files) {
      console.log("file name: ", tmp.name);
      console.log("file size: ", tmp.size / (1024 * 1024), "MB");
      console.log("file type: ", tmp.type);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!files) {
      setMessage("No files selected");
      return;
    }

    const formData = new FormData();
    Array.from(files).forEach(file => formData.append("audioFiles", file));

    try {
      const res = await fetch("http://localhost:4000/upload", {
        method: "POST",
        body: formData, // Do not set Content-Type manually
      });

      if (!res.ok) {
        throw new Error('File upload failed');
      }

      const data = await res.json();
      setMessage(data.message || 'Upload successful'); // Ensure to handle possible message key
    } catch (error) {
      console.error('Error uploading files:', error);
      setMessage('Failed to upload files.');
    }
  };

  return (
    <>
      <h1>Upload Files</h1>
      <form onSubmit={handleSubmit}>
        <input type="file" multiple onChange={handleFileChange} />
        <button type="submit">Submit</button>
      </form>
      <p>{message}</p>
    </>
  );
};

export default UploadFile;
