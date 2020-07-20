// This only works if the array is full of strings or numbers

// Example usage:
// ['a', 'a', 'b', 'c'].filter(onlyUnique)
export const onlyUnique = (current, i, arr) =>
  // index of returns the index of the first occurance of something
  // so this will only return true for the first instance of a given string or number
  arr.indexOf(current) === i;
