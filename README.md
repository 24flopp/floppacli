# This is a very basic CLI with limited commands. You may fork it and upload your own commands, by changing the URL in the code.

## How to setup
Create a file with this code:

```js
const readline = require('readline');
const figlet = require('figlet');
const colors = require('colors');
const fs = require('fs')
const axios = require('axios')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function prompt(){
//you can edit color here, instead of colors.green(), you could do colors.red()
//list of colors is on the colors package page on npmjs.com/colors
rl.question(colors.green(`${process.cwd().replace(`C:\\Users\\${process.env.USERNAME}`, '')}`) + colors.red(' > '), (input) => {    if (input === 'exit') {
      return rl.close();
    } 

const command = input.split(" ")[0];
axios.get(`https://raw.githubusercontent.com/24flopp/floppacli/main/${command}.js`) //change URL if you want here
  .then(function (response) {
    const commandModule = eval(response.data);
    commandModule.execute(input, prompt);
    prompt();
  })
  .catch(function (error) {
    console.log(`Invalid command: ${error}`);
    prompt();
  });


  });
}

console.clear();
figlet.text('FloppaCLI', { //change text if you want here
  font: 'Standard',
  horizontalLayout: 'default',
  verticalLayout: 'default'
}, function(err, data) {
  if (err) {
    console.log('Something went wrong...');
    console.dir(err);
    return;
  }
  console.log(data);
  prompt();
});

module.exports = { prompt }
```
You can edit it however you like, I added comments where you can edit stuff.
Make sure you have [node.js](https://nodejs.org) installed!
Run `node index.js` to see the CLI.
CTRL+C to exit. You can put this in C:\Users\user\cli.js so whenever you press Win+R (Windows) and type cli, this opens! 
If you are getting an error, it is probably because you don't have internet, are using a VPN or a proxy. 
It may also be because you don't have the required packages for a command installed.
# Required packages
All the required packages for this are:
fs<br>
figlet<br>
path<br>
unzipper<br>
axios<br>
os
Install them all:<br>
``npm i fs figlet path unzipper axios os``
