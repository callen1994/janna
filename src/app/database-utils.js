import sayThis from "./easy-speech";

export function getDoc(dataBase, path) {
  return dataBase
    .doc(path)
    .get()
    .then(
      (succ) => succ.data(),
      (err) => console.log("Failed to fetch from document: " + path, err)
    );
}

export function setDoc(dataBase, path, data) {
  return dataBase
    .doc(path)
    .set(data)
    .then(
      (succ) => succ.data(),
      (err) => console.log("Failed to save data to: " + path, err)
    );
}

export function getCollection(dataBase, path) {
  console.log("Getting collection: " + path);
  return dataBase
    .collection(path)
    .get()
    .then(
      (succ) => succ.docs.map((d) => d.data()),
      (err) => console.log("Failed to fetch from collection: " + path, err)
    );
}
