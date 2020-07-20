import { onlyUnique } from "./utils";

// A list of objects defining the connection between two nodes (nouns)
// currently these objects only define the
// const edges = [];

function makePair(node1, node2) {
  // To allow myself to easily identify these in the future
  // I'm making sure the pair is sorted (it defaults to alphabetically for strings)
  // then I create an ID which is that turned into a stirng so I can easily call filter(onlyUnique)
  // on that field
  const pair = [node1, node2].sort();
  const id = pair.toString();
  return { id, pair };
}

// node groups is a list of node groups. I'm creating an edge among all nodes
// that show up in the same group and that show up in adjacent groups
export function nodesAndConnections(nodeGroups) {
  const uniqueNodes = nodeGroups.flat().filter(onlyUnique);
  const connections = nodeGroups.reduce(
    (bigAccumulator, currentGroup, messIndex, messGrouped) => {
      // Identify connections among nound within the message
      const connsWithin = currentGroup.reduce((acc, curr, i, src) => {
        const subsequentNodes = src.slice(i + 1, src.length);
        return acc.concat(subsequentNodes.map((n) => makePair(n, curr)));
      }, []);

      // If there is a next message, create connections between the
      // nouns in this message and the nouns in the next message
      const nextGroup = messGrouped[messIndex + 1];
      const connsAccross = nextGroup
        ? currentGroup.reduce((acc, curr) => {
            return acc.concat(nextGroup.map((n) => makePair(n, curr)));
          }, [])
        : [];

      return bigAccumulator.concat(connsWithin, connsAccross);
    },
    []
  );

  const weighted = connections
    .map((conn) => conn.id)
    .filter(onlyUnique)
    .map((id) => ({
      ...connections.find((conn) => conn.id === id),
      weight: connections.filter((conn) => conn.id === id).length,
    }));

  return [uniqueNodes, weighted];
}
