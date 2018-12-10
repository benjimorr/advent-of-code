const getData = require('../readFile');

const getBoxId = text => {
  const textArr = text.split(' ');
  return textArr[0];
};

const getNumbersFromString = text => {
  const textArr = text.split(' ');
  const boxId = textArr[0];
  const [distanceFromLeft, distanceFromTop] = textArr[2]
    .slice(0, -1)
    .split(',');
  const [width, height] = textArr[3].split('x');

  return [boxId, distanceFromTop, height, distanceFromLeft, width];
};

const cutFabric = (
  fabric,
  boxId,
  distanceFromTop,
  height,
  distanceFromLeft,
  width
) => {
  Array(parseInt(height))
    .fill()
    .map((_, i) => {
      const position = parseInt(distanceFromTop) + (i + 1);

      if (!fabric[position]) {
        fabric[position] = {};
      }

      cutWidth(fabric[position], width, distanceFromLeft, boxId);
    });
};

const cutWidth = (row, width, distanceFromLeft, boxId) => {
  Array(parseInt(width))
    .fill()
    .map((_, i) => {
      const position = parseInt(distanceFromLeft) + (i + 1);

      if (row[position]) {
        row[position].push(boxId);
      } else {
        row[position] = [boxId];
      }
    });
};

// Part One
const getSquareInchesOverlap = claims => {
  const fabricLayout = {};
  let overlapCount = 0;
  const fabricCutouts = claims.map(plan => {
    return getNumbersFromString(plan);
  });

  fabricCutouts.map(cutout => {
    cutFabric(fabricLayout, ...cutout);
  });

  Object.values(fabricLayout).map(row => {
    Object.values(row).forEach(square => {
      if (square.length > 1) {
        overlapCount += 1;
      }
    });
  });

  return overlapCount;
};

getData('./dayThree.txt').then(data => {
  console.log(`Overlap count is: ${getSquareInchesOverlap(data.split('\n'))}`);
});

// Part Two
const findIntactBoxId = claims => {
  const fabricLayout = {};
  const fabricCutouts = claims.map(plan => {
    return getNumbersFromString(plan);
  });

  const boxIds = claims.map(plan => {
    return getBoxId(plan);
  });

  fabricCutouts.map(cutout => {
    cutFabric(fabricLayout, ...cutout);
  });

  Object.values(fabricLayout).map(row => {
    Object.values(row).forEach(square => {
      if (square.length > 1) {
        square.map(id => {
          const idIndex = boxIds.indexOf(id);
          if (idIndex > -1) {
            boxIds.splice(idIndex, 1);
          }
        })
      }
    });
  });

  return boxIds;
};

getData('./dayThree.txt').then(data => {
  console.log(`Intact boxId is: ${findIntactBoxId(data.split('\n'))}`);
});
