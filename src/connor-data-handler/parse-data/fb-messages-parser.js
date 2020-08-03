import { getNounList, tagAllWords } from "./natural-tools";

export function parseFBMessageData(jsonData) {
  // After a little testing it's clear the messages are already sorted from newest to oldest
  // Gotta filter out the messages that don't have a content field, those are messages that were just an attachment
  const messagesGrouped = jsonData.messages
    .filter((mess) => mess.content)
    .reduce((acc, current) => {
      const prev = acc[acc.length - 1];

      // If we have a previous message and that previous message is from the same sender
      // add the content of this message to that message
      // otherwise push the current message onto the end of the accumulator
      prev && prev.sender_name === current.sender_name
        ? (acc[acc.length - 1] = {
            ...prev,
            content: prev.content + ". " + current.content,
          })
        : acc.push(current);

      return acc;
    }, []);

  // Creates a new field on each message group of the nouns in that group

  // Do do sentiment analysis we need to think about separating the message into sentinces
  // during this tokenizing process
  messagesGrouped.forEach((mess) => {
    mess.nouns = getNounList(mess.content);
    mess.tokens = tagAllWords(mess.content);
  });

  // Replace "I" with the name of the sender
  // also look into replacing "you"
  messagesGrouped.map(
    (mess) =>
      (mess.nouns = (mess.nouns || []).map((n) =>
        n === "I" ? mess.sender_name : n
      ))
  );

  return messagesGrouped;
}
