import {
  BrillPOSTagger,
  RuleSet,
  TreebankWordTokenizer,
  SentimentAnalyzer,
  PorterStemmer,
  Lexicon,
} from "natural";

import { onlyUnique } from "./utils";

export const tokenizer = new TreebankWordTokenizer();
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

export const getNounList = (content) =>
  tagger
    .tag(tokenizer.tokenize(content))
    .taggedWords.filter((tagged) =>
      ["NN", "NNP", "NNPS", "NNS"].includes(tagged.tag)
    )
    .map((tagged) => tagged.token)
    .filter(onlyUnique);
