import React, { useState } from "react";
import natural from "natural"

//var wordnet = new natural.WordNet('./WordNet/2.1/dict');
//mport * as firebase from "firebase";
//import fbConfig from "../firebase-config";


// firebase.initializeApp(fbConfig);
// const dataBase = firebase.firestore();

var tokenizer = new natural.WordTokenizer();

const language = "EN"
const defaultCategory = 'N';
const defaultCategoryCapitalized = 'NNP';

var lexicon = new natural.Lexicon(language, defaultCategory, defaultCategoryCapitalized);
var ruleSet = new natural.RuleSet('EN');
var tagger = new natural.BrillPOSTagger(lexicon, ruleSet);

const Transcribe = () => {

    const ParseText = () => {
       var TextArea = document.getElementById("TextArea_");
       var Output1 = document.getElementById("Output1");
       var Output2 = document.getElementById("Output2");
       var Output3 = document.getElementById("Output3");
       console.log(tokenizer.tokenize(TextArea.value));


       Output1.innerHTML = tokenizer.tokenize(TextArea.value)

       var PoS_Logical =  tagger.tag(tokenizer.tokenize(TextArea.value)).taggedWords.filter(x => ['NN','NNP','NNPS','NNS'].indexOf(x.tag) >= 0);
       Output2.innerHTML = PoS_Logical.map(x => x.token);
       Output3.innerHTML = PoS_Logical.map(x => x.tag);

       console.log(PoS_Logical);
    };


    
  return (
    <div className="Transcribe">
      <h2>Janna Scribe</h2>
      <div style={{ display: "flex" }}>
        <div style={{ flex: 2 }}>
          <div className="buttons">

            <textarea id="TextArea_">Insert Text Here</textarea>
            <button onClick={ParseText}>Nodulate</button>

          <div id="Output1" style={{ padding: "2em" }}></div>
          <div id="Output2" style={{ padding: "2em" }}></div>
          <div id="Output3" style={{ padding: "2em" }}></div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Transcribe;

