import {
  BrillPOSTagger,
  RuleSet,
  TreebankWordTokenizer,
  SentimentAnalyzer,
  PorterStemmer,
  Lexicon,
  WordPunctTokenizer,
  SentenceTokenizer,
} from "natural";

import { onlyUnique } from "./utils";

export const treeWordTokenizer = new TreebankWordTokenizer();
export const sentenceTokenizer = new SentenceTokenizer();
// export const tokenizer = new WordPunctTokenizer();
export const analyzer = new SentimentAnalyzer(
  "English",
  PorterStemmer,
  "afinn"
);

const language = "EN";
const defaultCategory = "N";
const defaultCategoryCapitalized = "NNP";

export const tagger = new BrillPOSTagger(
  new Lexicon(language, defaultCategory, defaultCategoryCapitalized),
  new RuleSet("EN")
);
export const tagAllWords = (content) => {
  return sentenceTokenizer
    .tokenize(content + ".")
    .map((sen) => taggedSetnenceWords(sen).taggedWords)
    .flat();
};
export const taggedSetnenceWords = (content) =>
  tagger.tag(treeWordTokenizer.tokenize(content));

// Turn n't into "not"
// do other cleaning stuff
// get rid of double periods
// etc...

export const getNounList = (content) => {
  sentenceTokenizer
    .tokenize(content + ".")
    .map((sentence) =>
      taggedSetnenceWords(sentence)
        .taggedWords.filter((tagged) =>
          ["NN", "NNP", "NNPS", "NNS"].includes(tagged.tag)
        )
        .map((tagged) => tagged.token)
    )
    .flat();

  return tagger
    .tag(treeWordTokenizer.tokenize(content))
    .taggedWords.filter((tagged) =>
      ["NN", "NNP", "NNPS", "NNS"].includes(tagged.tag)
    )
    .map((tagged) => tagged.token);
};

// .filter(onlyUnique);
