var chalk = require('chalk');
var filesize = require('filesize');

function padRight(str, l, p) {
  var s = str;
  while (s.length < l) {
    s += p;
  }
  return s;
}

function getHumanSize(size) {
  return padRight(filesize(size), 10, ' ');
}

module.exports = function logStats(stats, ret, prefix) {
  prefix = prefix || '';
  var smallest = stats.sizes.final;
  var smallColor = 'grey';
  if (smallest > 1024) {
    smallColor = 'white';
  }
  if (smallest > 1024 * 5) {
    smallColor = 'green';
  }
  if (smallest > (1024 * 10)) {
    smallColor = 'yellow';
  }
  if (smallest > (1024 * 50)) {
    smallColor = 'magenta';
  }
  if (smallest > (1024 * 500)) {
    smallColor = 'red';
  }

  var name = stats.realFilePath.length > 30 ? stats.name : stats.realFilePath;
  var msg = prefix + chalk[smallColor](getHumanSize(smallest)) + '  ' + chalk.cyan(padRight(name, 32, ' ')) +
    chalk.grey(
      'original: ' + getHumanSize(stats.sizes.original) +
      ' gzip+min: ' + getHumanSize(stats.sizes.final)
    );

  if (ret) {
    return msg;
  }
  console.log(msg);
};
