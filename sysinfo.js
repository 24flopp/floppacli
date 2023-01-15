const os = require('os');

module.exports = {
  name: 'sysinfo',
  usage: '',
  description: 'Displays information about the system',
  async execute(command, prompt) {
    const cpu = os.cpus()[0].model;
    const arch = os.arch();
    const platform = os.platform();
    const mem = os.totalmem();
    const freeMem = os.freemem();
    const uptime = os.uptime();

    console.log(`CPU: ${cpu}`);
    console.log(`Architecture: ${arch}`);
    console.log(`Platform: ${platform}`);
    console.log(`Total Memory: ${mem}`);
    console.log(`Free Memory: ${freeMem}`);
    console.log(`Uptime: ${uptime}`);

    prompt();
  }
};
