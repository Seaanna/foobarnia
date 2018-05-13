exports.tally = function(votes) {
  let tallyResult= [];
  let counts = [];

  // get frequency of votes and store result in counts
  for (let index = 0; index < votes.length; index++) {
    const number = votes[index];

    let existingIndex = counts.findIndex(count => count.key == number);
    if (existingIndex >= 0) {
      counts[existingIndex].votes += 1;
    } else {
        counts.push({key: number, votes: 1});
    }
  }

  // sorts count greatest to smallest
  const sortedCounts = counts.sort(function(a,b) {
    return b.votes - a.votes;
  });

  // check for majority winner
  const majorityThreshold = parseInt(votes.length/2) + 1;
  const majorityWinner = sortedCounts[0].votes >= majorityThreshold;
  if (majorityWinner) {
    tallyResult = [sortedCounts[0].key]
  } else {
    // election runoff
    tallyResult = [
      sortedCounts[0].key,
      sortedCounts[1].key,
      sortedCounts[2].key
    ]
    // check runoff for ties
    let index = 3;
    while (sortedCounts[2].votes == sortedCounts[index].votes){
      tallyResult.push(sortedCounts[index].key);
      index++;
    }
    tallyResult.sort();
  }

  return tallyResult;
}
