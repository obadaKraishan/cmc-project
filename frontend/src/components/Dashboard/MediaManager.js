import React, { useState } from 'react';

const MediaManager = () => {
  const [mediaFiles, setMediaFiles] = useState([]);

  const handleUpload = (e) => {
    const files = e.target.files;
    // Handle file upload logic here
  };

  return (
    <div>
      <h1>Media Manager</h1>
      <input type="file" onChange={handleUpload} multiple />
      <div>
        {mediaFiles.map((file, index) => (
          <div key={index}>{file.name}</div>
        ))}
      </div>
    </div>
  );
};

export default MediaManager;
