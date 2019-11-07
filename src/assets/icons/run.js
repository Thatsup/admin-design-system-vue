const fs = require('fs'),
  files = fs.readdirSync(__dirname + '/svg/');

var stream = fs.createWriteStream("icons.js");
stream.once('open', function(fd) {
  stream.write("export const icons = {\n");

  files.forEach(function(file) {
    var contents = fs.readFileSync(__dirname + '/svg/' + file, 'utf8');
    const regex = / d="([^']*?)"/i
    const match = contents.match(regex)
    const fileName = file.split('.')[0]//.replace('-', '')

    if (match && match[1]) {
      stream.write(`"${fileName}": "${match[1]}", \n`);
    }
  })

  stream.write("};");
  stream.end();
});