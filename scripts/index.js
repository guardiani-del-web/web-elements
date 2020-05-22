const cli = require('./cli');

cli.run({
  process,
  logger: cli.createNodeLogger(process),
  sys: cli.createNodeSystem(process)
});