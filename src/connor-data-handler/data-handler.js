import React, { useState } from "react";
import "./data-handler.css";
import FileInput from "./file-input";
import readFile from "./easy-read-file";
import { parseFBMessageData } from "./fb-messages-parser";
import { nodesAndConnections } from "./build-connections";

const Handler = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [errMessage, setErr] = useState("");
  let parsedData;
  const test = () => console.log(selectedFile);
  const loadTestData = () =>
    readFile(process.env.PUBLIC_URL + "/message_history.json").then((res) => {
      setSelectedFile(res);
      console.log("Data Loaded!");
    });

  const parseLoadedData = () => {
    // I'm assuming that the parsed data is a facebook message history object right now
    if (!selectedFile) {
      setErr("You haven't loaded any data yet");
    } else {
      setErr("");
      const parsedData = JSON.parse(selectedFile);
      const messagesParsed = parseFBMessageData(parsedData);

      const [nodes, connections] = nodesAndConnections(
        messagesParsed.map((m) => m.nouns)
      );

      console.log("\n\n%cNodes!\n", "color: yellow");
      console.log(nodes);
      console.log("\n\n%cConnections!\n", "color: yellow");
      console.log(connections);
    }
  };

  return (
    <div className="container">
      <div className="inputs">
        {/* <h4>Enter Text For me to parse</h4>
        <textarea className="myTextArea"></textarea> */}
        <h4>
          Upload a file <FileInput setResult={setSelectedFile}></FileInput>
        </h4>
      </div>
      <div className="processing">
        <h4>Parse the data</h4>
        <h4 className="error">{errMessage}</h4>
        <button onClick={test}>Test</button>
        <button onClick={loadTestData}>Use Test Data</button>
        <button onClick={parseLoadedData}>Parse</button>
      </div>
    </div>
  );
};

export default Handler;
