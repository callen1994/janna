import React, { useState } from "react";
import natural from "natural"
//import message from "message_1.json"
//var wordnet = new natural.WordNet('./WordNet/2.1/dict');
//mport * as firebase from "firebase";
//import fbConfig from "../firebase-config";


// firebase.initializeApp(fbConfig);
// const dataBase = firebase.firestore();

var tokenizer = new natural.TreebankWordTokenizer();
var Analyzer = natural.SentimentAnalyzer;
var stemmer = natural.PorterStemmer;

var analyzer = new Analyzer("English", stemmer, "afinn");

const language = "EN"
const defaultCategory = 'N';
const defaultCategoryCapitalized = 'NNP';

var lexicon = new natural.Lexicon(language, defaultCategory, defaultCategoryCapitalized);
var ruleSet = new natural.RuleSet('EN');
var tagger = new natural.BrillPOSTagger(lexicon, ruleSet);

function diff(A) {
  return A.slice(1).map(function(n, i) { return (n - A[i]) != 0; });
}



function readJsonFile(jsonFile) {
  var reader = new FileReader();
  reader.addEventListener('load', (loadEvent) => {
    try {
      var json = JSON.parse(loadEvent.target.result);
      console.log(json);
      console.log(json.messages)

      var participants = json.participants.map(x => x.name);
      console.log(participants);
      
      var par_index = json.messages.map(x => participants.indexOf(x.sender_name));
      console.log(par_index);

      var par_index_diff = diff(par_index)
      par_index_diff.unshift(true)
      par_index_diff.push(true)
      console.log(par_index_diff);

      const indices = par_index_diff.reduce(
        (out, bool, index) => bool ? out.concat(index) : out, 
        []
      )

      console.log(indices)
      var concat_messages = [];
      var block_nodes = [];
      var sentiment = [];
      var previous_message = [];
      var edges = [];
      var i;
      var j;
      for (i = 0; i < indices.length-1; i++){
        console.log(indices[i])

        for (j = indices[i]; j < [indices[i+1]]; j++) {

          if (("content" in json.messages[j]) ){
          json.messages[j].content = json.messages[j].content.replace(/‘|_/g,"'") 
          json.messages[j].content = json.messages[j].content.replace(/â|_/g,"'") 
          }

          if (j == indices[i]) {
            if (("content" in json.messages[j]) ){
            concat_messages[i] = json.messages[j].content;}
            else {
            concat_messages[i] = ", ";

            }
          } else {
            if (("content" in json.messages[j]) ){
            concat_messages[i]= concat_messages[i].concat(', ',json.messages[j].content);}
            else{
              concat_messages[i]= concat_messages[i].concat(', ');
            }
          }
        }
        console.log(concat_messages[i])
        block_nodes[i] = tagger.tag(tokenizer.tokenize(concat_messages[i])).taggedWords.filter(x => ['NN','NNP','NNPS','NNS'].indexOf(x.tag) >= 0).map(x => x.token).filter(y => y.length > 2)
        sentiment[i] = analyzer.getSentiment(tokenizer.tokenize(concat_messages[i]));
        console.log(block_nodes[i])
        console.log(sentiment[i])

        edges.push(block_nodes[i].flatMap(
          (v, k) => block_nodes[i].slice(k+1).map( w => v + ' ' + w )
      ));
        

        if (i > 0) {
          previous_message = block_nodes[i-1];
          edges.push([].concat.apply([],block_nodes[i].map(x => [].concat.apply([],previous_message.map(y=> y + ' ' + x)))))

        }
        console.log(edges)

        
      }
      console.log(concat_messages)
      console.log(block_nodes)
      console.log(block_nodes.join('.'))
      console.log(sentiment)
      console.log(edges)
    } catch (error) {
      console.error(error);
    }
  });
  reader.readAsText(jsonFile);
}


const Transcribe = () => {

  
    const ParseText = () => {

       var TextArea = document.getElementById("TextArea_");
       var Output1 = document.getElementById("Output1");
       var Output2 = document.getElementById("Output2");
       var Output3 = document.getElementById("Output3");
       var JSON_File = document.getElementById("jsonFile");

       console.log(JSON_File)

       var fileselect = false;
       if( JSON_File.files.length == 1 ){
        console.log("files selected");
        fileselect = true;

        readJsonFile(JSON_File.files[0])
       }


       

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

            <input id="jsonFile" name="jsonFile" type="file"></input>
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

