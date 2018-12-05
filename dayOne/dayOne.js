const getData = require('../readFile');

const calculateFrequency = numbers => {
  const frequencyLog = {};
  let accStart = 0;
  let sameFrequency;

  while (true) {
    frequencyLog[accStart.toString()] = 1;

    if (sameFrequency !== undefined) {
      break;
    }

    const endFrequency = numbers.reduce((acc, num) => {
      acc += parseInt(num);

      if (
        !sameFrequency &&
        Object.keys(frequencyLog).includes(acc.toString())
      ) {
        sameFrequency = acc;
      }

      frequencyLog[acc.toString()] = 1;
      return acc;
    }, accStart);

    accStart = endFrequency;
  }

  return sameFrequency;
};

getData('./dayOne.txt').then(data => {
  console.log(`Same frequency is: ${calculateFrequency(data.split('\n'))}`);
});
