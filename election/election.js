exports.tally = function(votes) {
  let tallyResult= [];
  let counts = [];
  const majorityVote = parseInt(votes.length/2) + 1;

  for (let i = 0; i < votes.length; i++) {
    const number = votes[i];
    const count = counts[number] ? counts[number] + 1 : 1;

    let existingIndex = counts.findIndex(count => count.key == number);
    if (existingIndex >= 0) {
      counts[existingIndex].votes += 1;
    } else {
        counts.push({key: number, votes: 1})
    }
  }

  const sortedCounts = counts.sort(function(a,b) {
    return b.votes - a.votes;
  });

  if (sortedCounts[0].votes >= majorityVote) {
    tallyResult = [sortedCounts[0].key]
  } else {
    tallyResult = [
      sortedCounts[0].key,
      sortedCounts[1].key,
      sortedCounts[2].key
    ].sort()
  }

  return tallyResult;
}
