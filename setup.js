const fs = require('fs')
const unzipper = require('unzipper')
const axios = require('axios')
const path = require('path')

module.exports = {
  name: 'setup',
  usage: 'bot [path]',
  description: 'Sets up a discord bot in the specified path',
  async execute(command, prompt) {
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
      const url = 'https://github.com/24flopp/floppacli/raw/main/bot.zip'
      const response = await axios({
        method: 'GET',
        url: url,
        responseType: 'stream'
      })

      response.data.pipe(unzipper.Extract({ path: botPath }))
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
  }
};
