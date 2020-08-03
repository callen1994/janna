import React, { useState } from "react";
import "./Data-Handler.css";
import FileInput from "./input-data/File-Input";
import readFile from "./input-data/easy-read-file";
import { parseFBMessageData } from "./parse-data/fb-messages-parser";
import { nodulateNodeGroups } from "./parse-data/build-connections";
import DropDown from "./input-data/MyDropDown";
import ConnectionDisplay from "./Connection-Display/Connection-Display";
const Handler = () => {
  // String value of data to be parsed
  let selectedFile = null;
  let fileType = "Facebook";

  const [errMessage, setErr] = useState("");
  const [nodes, setNodes] = useState(null);
  const [edges, setEdges] = useState(null);

  const loadTestData = () =>
    readFile(process.env.PUBLIC_URL + "/message_history.json").then((res) => {
      selectedFile = res;
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

      // Logs to look at the data in the console

      console.log("\n\n%cAll Messages !\n", "color: yellow");
      console.log(messagesParsed);

      console.log("\n\n%cMessages with no nouns!\n", "color: yellow");
      console.log(messagesParsed.filter((m) => !m.nouns.length));

      const results = nodulateNodeGroups(messagesParsed.map((m) => m.nouns));
      setNodes(results[0]);
      setEdges(results[1]);

      console.log("\n\n%cNodes!\n", "color: yellow");
      console.log(nodes);
      console.log("\n\n%cConnections!\n", "color: yellow");
      console.log(edges);
    }
  };

  return (
    <div className="container">
      <div className="topButtons">
        <div className="inputs">
          <h4>Enter Text For me to parse</h4>
          <textarea
            onChange={(event) => (selectedFile = event.target.value)}
            className="myTextArea"
          ></textarea>
          <h4>
            Upload a file{" "}
            <FileInput setResult={(res) => (selectedFile = res)}></FileInput>
          </h4>
        </div>
        <div className="processing">
          <h4>Parse the data</h4>
          <h4 className="error">{errMessage}</h4>
          <button onClick={() => console.log(selectedFile, "\n\n", fileType)}>
            Test
          </button>
          <button onClick={loadTestData}>Use Test Data</button>
          <DropDown
            onChange={(val) => (fileType = val)}
            label="Parse Data As:"
            values={["Facebook Messages", "Block Text"]}
          ></DropDown>
          <button onClick={parseLoadedData}>Parse</button>
        </div>
      </div>
      <div className="connections">
        {nodes && edges ? (
          <ConnectionDisplay nodes={nodes} edges={edges} />
        ) : (
          <h3>No data to display yet</h3>
        )}
      </div>
    </div>
  );
};

export default Handler;
