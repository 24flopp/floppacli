const fs = require('fs');
const path = require('path')
module.exports = {
  name: 'rm',
  usage: '[-r] [-f] [-v] file',
  description: 'Remove files or directories',
  async execute(command, prompt) {
    const args = command.split(" ");
    let removeDir = false;
    let forceRemove = false;
    let verbose = false;
    let fileIndex = args.length;

    // Check for options
    for (let i = 1; i < args.length; i++) {
      if (args[i].startsWith("-")) {
        if (args[i].includes("r")) {
          removeDir = true;
        }
        if (args[i].includes("f")) {
          forceRemove = true;
        }
        if (args[i].includes("v")) {
          verbose = true;
        }
      } else {
        fileIndex = i;
        break;
      }
    }

    // Get file/directory path
    const file = args.slice(fileIndex, args.length).join(" ");
    const filePath = path.resolve(file);

    if (!fs.existsSync(filePath)) {
      console.log("File or directory does not exist.");
      prompt();
      return;
    }

    if (fs.lstatSync(filePath).isDirectory() && !removeDir) {
      console.log("Cannot remove a directory. Use the -r option to remove a directory.");
      prompt();
      return;
    }

    if (!forceRemove) {
      rl.question("Are you sure you want to remove this file or directory? (y/n)", (answer) => {
        if (answer === 'n') {
          console.log("Removal cancelled.");
          prompt();
          return;
        } else {
          removeFile();
        }
      });
    } else {
      removeFile();
    }

    function removeFile() {
      try {
        if (fs.lstatSync(filePath).isDirectory()) {
          fs.rmdirSync(filePath, { recursive: true });
        } else {
          fs.unlinkSync(filePath);
        }
        if (verbose) {
          console.log(`Successfully removed ${filePath}`);
        }
        prompt();
      } catch (err) {
        console.log(`Error while removing ${filePath}: ${err}`);
        prompt();
      }
    }
  }
}
