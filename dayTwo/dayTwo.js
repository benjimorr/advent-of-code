const getData = require('../readFile');

const calculateCheckSum = boxIds => {
  const letterFrequency = { '2': 0, '3': 0 };

  boxIds.map(boxId => {
    const charCount = {};

    boxId.split('').map(char => {
      Object.keys(charCount).includes(char)
        ? (charCount[char] += 1)
        : (charCount[char] = 1);
    });

    if (Object.values(charCount).includes(2)) {
      letterFrequency['2'] += 1;
    }

    if (Object.values(charCount).includes(3)) {
      letterFrequency['3'] += 1;
    }
  });

  return letterFrequency['2'] * letterFrequency['3'];
};

getData('./dayTwo.txt').then(data => {
  console.log(`Checksum is: ${calculateCheckSum(data.split('\n'))}`);
});
