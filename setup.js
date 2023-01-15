    const args = command.split(" ");
    if (args[1] !== 'bot') {
      console.log("Invalid subcommand. Usage: setup [subcommand] [path]");
      prompt();
      return;
    }

    let botPath = args[2] || './';
    botPath = path.resolve(botPath);

    if (!fs.existsSync(botPath)) {
      console.log("The specified path does not exist.");
      prompt();
      return;
    }

    try {
      fs.createReadStream('./files/bots/bot-v14/bot.zip')
        .pipe(unzipper.Extract({ path: botPath }))
        .on('close', () => {
          console.log("Bot set up successfully in the specified path");
          prompt();
        });
    } catch (err) {
      console.log("An error occurred while setting up the bot.");
      console.log(err);
      prompt();
      return;
    }
