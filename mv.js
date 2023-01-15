const fs = require('fs');
const path = require('path');

module.exports = {
  name: 'mv',
  usage: '[options] <source> <destination>',
  description: 'Move or rename files or directories',
  async execute(command, prompt) {
    const args = command.split(" ");
    let options = [];
    let source, destination;
    for (let i = 1; i < args.length; i++) {
      if (args[i].startsWith("-")) {
        options.push(args[i]);
      } else if (!source) {
        source = args[i];
      } else {
        destination = args[i];
      }
    }
    if (!source || !destination) {
      console.log("Please provide both a source and destination file or directory");
      prompt();
      return;
    }
    source = path.resolve(source);
    destination = path.resolve(destination);
    if (!fs.existsSync(source)) {
      console.log("The specified source file or directory does not exist.");
      prompt();
      return;
    }
    let moveFunction = fs.renameSync;
    if (options.indexOf("-f") !== -1) {
      moveFunction = fs.copyFileSync;
    }
    if (options.indexOf("-n") !== -1) {
      if (fs.existsSync(destination)) {
        console.log("The specified destination file or directory already exists, not overwriting.");
        prompt();
        return;
      }
    }
    if (options.indexOf("-v") !== -1) {
      console.log(`Moving ${source} to ${destination}`);
    }
    try {
      moveFunction(source, destination);
    } catch (err) {
      console.log(`An error occurred while moving ${source} to ${destination}`);
      console.log(err);
      prompt();
      return;
    }
    if (options.indexOf("-v") !== -1) {
      console.log(`Successfully moved ${source} to ${destination}`);
    }
    prompt();
  }
};
