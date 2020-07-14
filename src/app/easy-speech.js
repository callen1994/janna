function sayThis(words, name) {
  const voiceBox = window.speechSynthesis;
  const toSay = new SpeechSynthesisUtterance(words);
  if (name) {
    toSay.voice = voiceBox.getVoices().find((v) => v.name === name);
  }
  voiceBox.speak(toSay);
}

export default sayThis;
