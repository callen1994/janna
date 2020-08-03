import React, { useState } from "react";

const FileInput = (props) => {
  // eslint-disable-next-line no-unused-vars
  let [doneMessage, doneSetter] = useState("Choose a file");

  const openFileInput = () => document.getElementById("fileInput").click();

  const readAndSet = (selectedFile) => {
    const fileReader = new FileReader();
    fileReader.onload = () => {
      props.setResult(fileReader.result);
      console.log("File uploaded, updating message");
      doneSetter("Done!");
    };
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
