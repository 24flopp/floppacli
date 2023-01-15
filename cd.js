    const args = command.split(" ")
    if(!fs.existsSync(args[1]) || !fs.lstatSync(args[1]).isDirectory()){
      console.log('Invalid directory.')
      prompt();
    }
    process.chdir(args[1]);
    prompt();
