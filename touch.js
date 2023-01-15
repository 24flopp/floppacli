const fileName = command.split(' ')[1]
fs.closeSync(fs.openSync(fileName, 'w'));
console.log(`File ${fileName} created.`);
prompt();
