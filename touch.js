const fs = require('fs')
module.exports = {
  usage: '<name>',
  name: 'touch',
  description: 'Create file.',
  async execute(command, prompt){
    const fileName = command.split(' ')[1]
    fs.closeSync(fs.openSync(fileName, 'w'));
console.log(`File ${fileName} created.`);
    prompt();
  }
}
