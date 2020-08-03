import React, { useState } from "react";
import { Subject } from "rxjs";
import "./Connection-Display.css";

const ConnectionDisplay = ({ nodes, edges }) => {
  const nodeSelected = new Subject();
  const NodeButtons = () => (
    <div className="node-display">
      {nodes.map((n, i) => (
        <button key={i} onClick={() => nodeSelected.next(n)}>
          {n}
        </button>
      ))}
    </div>
  );

  const SelectedEdges = ({ $selectedNode }) => {
    const [selectedNode, setSelected] = useState(null);
    $selectedNode.subscribe(setSelected);
    return (
      <div className="edge-display">
        {selectedNode ? (
          edges
            .filter((e) => e.pair.includes(selectedNode))
            .map((e, i) => (
              <div key={i}>
                {e.pair.find((p) => p !== selectedNode)}: {e.weight}
              </div>
            ))
        ) : (
          <h4>No Node Selected</h4>
        )}
      </div>
    );
  };

  return (
    <div className="connections-container">
      <NodeButtons />
      <SelectedEdges $selectedNode={nodeSelected} />
    </div>
  );
};

export default ConnectionDisplay;
