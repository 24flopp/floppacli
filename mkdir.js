    const dirName = command.split(' ')[1]
    if(!dirName){
    prompt();
    return; 
}
    fs.mkdirSync(dirName);
console.log(`Directory ${dirName} created.`);
    prompt();
