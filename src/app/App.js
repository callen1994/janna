import React, { useState } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import "./App.css";
import { makeCommands } from "./commands";
import fbConfig from "../firebase-config";
import * as firebase from "firebase";
import * as dbUtils from "./database-utils";
import PizzaOrders from "./pizza-orders";
import sayThis from "./easy-speech";

firebase.initializeApp(fbConfig);
const dataBase = firebase.firestore();

const App = () => {
  const [pizzas, setPizzas] = useState([]);
  const [pizzasOnFile, setFilePizzas] = useState([]);

  const addPizza = (newPizza) => {
    setPizzas([...pizzas, newPizza]);
  };

  const getDatabasePizzas = () => {
    dbUtils.getCollection(dataBase, "Pizzas").then(setFilePizzas);
  };

  const savePizzas = () => {
    const batch = dataBase.batch();
    pizzas.map((p) => batch.set(dataBase.collection("Pizzas").doc(), p));
    batch.commit().then(
      (succ) => sayThis("I saved all your pizzas"),
      (err) => {
        console.log(err);
        sayThis(
          "I had a problem saving all your pizzas, check the logs for more info"
        );
      }
    );
  };

  const { transcript } = useSpeechRecognition({
    commands: makeCommands(addPizza, getDatabasePizzas, savePizzas),
  });

  const startRecording = () =>
    SpeechRecognition.startListening({ continuous: true });
  const stopListening = () => SpeechRecognition.stopListening();

  return (
    <div className="App">
      <h2>Janna Mind Mapping</h2>
      <div style={{ display: "flex" }}>
        <div style={{ flex: 2 }}>
          <div className="buttons">
            <button onClick={startRecording}>Dicate Pizzas</button>
            <button onClick={stopListening}>Stop Listening</button>
            <div className="commands">
              <h3>Commands</h3>
              <div>
                Say "I would like to order a (size) pizza with (topping)" and
                I'll write it down
              </div>
              <div>
                Say "Remember my pizzas" and I'll save them to the cloud
              </div>
              <div>
                Say "What pizzas do you have on file" and I'll show you the list
              </div>
              <div>Say "Who's your daddy" and I'll tell you</div>
              <div>Say "Okay stop" and I'll stop listening</div>
            </div>
          </div>
          <h3 style={{ marginLeft: "1em" }}>Pizzas!</h3>
          <PizzaOrders pizzas={pizzas} />
          <div style={{ padding: "2em" }}>
            <h3>What I'm hearing</h3>
            <p>{transcript}</p>
          </div>
        </div>
        <div style={{ flex: 1 }}>
          <h2>{pizzasOnFile.length ? "Pizza's On File" : ""}</h2>
          <PizzaOrders pizzas={pizzasOnFile} />
        </div>
      </div>
    </div>
  );
};

export default App;
