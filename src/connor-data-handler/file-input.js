import React from "react";

const FileInput = ({ setResult }) => {
  const openFileInput = () => document.getElementById("fileInput").click();
  const readAndSet = (selectedFile) => {
    const fileReader = new FileReader();
    fileReader.onload = () => setResult(fileReader.result);
    fileReader.readAsText(selectedFile);
  };
  return (
    <span className="fileInputContainer">
      <button onClick={openFileInput}>Upload a file</button>
      <input
        onChange={(event) => readAndSet(event.target.files[0])}
        id="fileInput"
        type="file"
      />
    </span>
  );
};

export default FileInput;
