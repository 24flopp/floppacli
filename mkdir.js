const { prompt } = require('../index.js')
const fs = require('fs')
module.exports = {
  usage: '<name>',
  name: 'mkdir',
  description: 'Create a directory.',
  async execute(command){
    const dirName = command.split(' ')[1]
    if(!dirName){
    prompt();
    return; 
}
    fs.mkdirSync(dirName);
console.log(`Directory ${dirName} created.`);
    prompt();
  }
}