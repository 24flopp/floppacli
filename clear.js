    console.clear();
    figlet.text('FloppaCLI', {
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
