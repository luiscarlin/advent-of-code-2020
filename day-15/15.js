let nums = [8, 11, 0, 19, 1, 2];

let lastSeen = {};

const addToCache = (key, val) => {
  const cache = lastSeen[key];

  if (cache) {
    // there's a value there

    if (cache.length === 1) {
      lastSeen[key].push(val);
    } else {
      // there's more than one

      // console.log('before size of cache for', key, 'is', cache);
      lastSeen[key].shift();
      lastSeen[key].push(val);

      // console.log('after size of cache for', key, 'is', cache);
    }
  } else {
    lastSeen[key] = [val];
  }
};

for (let i = 0; i < nums.length; i++) {
  lastSeen[nums[i]] = [i + 1];
}

let currentTurn = nums.length + 1;
let lastNumber = nums[nums.length - 1];

//30000000
//2020
while (currentTurn !== 30000001) {
  if (lastSeen[lastNumber].length === 1) {
    // hadn't been seen before
    lastNumber = 0;
    addToCache(0, currentTurn);
  } else {
    // had been seen before
    const cache = lastSeen[lastNumber];

    const two = cache[cache.length - 1];
    const one = cache[cache.length - 2];

    const answer = two - one;

    lastNumber = answer;

    addToCache(answer, currentTurn);
  }

  currentTurn++;
}

console.log(lastNumber);
