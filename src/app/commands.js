import SpeechRecognition from "react-speech-recognition";
import sayThis from "./easy-speech";

export const makeCommands = (addPizza, getDatabasePizzas, savePizzas) => [
  {
    command: "I would like to order a :size pizza with :topping",
    callback: (size, topping) => addPizza({ size, topping }),
  },
  {
    command: "what pizzas do you have on file",
    callback: getDatabasePizzas,
  },
  {
    command: "remember my pizzas",
    callback: savePizzas,
  },
  {
    command: "who's your daddy",
    callback: () => sayThis("I love my Papa Connor", "Milena"),
  },
  {
    command: "Okay stop",
    callback: () => {
      console.log("Okay, Ill stop");
      SpeechRecognition.stopListening();
    },
  },
];
