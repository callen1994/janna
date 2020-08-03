export default function async_read_file(file_path) {
  return fetch(file_path).then(
    (r) =>
      !r.ok
        ? new Promise((res, rej) => rej(r.statusText))
        : r.blob().then(
            (b) =>
              new Promise((res, rej) => {
                const fileReader = new FileReader();
                fileReader.onload = (fileLoadedEvent) => res(fileReader.result);
                fileReader.readAsText(b);
              })
          ),
    (err) => {
      console.log("Error reading file!");
      throw new Error(err);
    }
  );
}
