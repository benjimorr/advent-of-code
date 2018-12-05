const fs = require('fs');
const util = require('util');

const readFile = util.promisify(fs.readFile);

async function getData(filename) {
  return await readFile(filename, 'utf8');
}

module.exports = getData;
