const fs = require("fs"),
  files = fs.readdirSync(__dirname + "/svg/");

var stream = fs.createWriteStream("icons.js");
stream.once("open", function() {
  let aliases = [];

  stream.write("export const icons = {\n");

  files.forEach(function(file) {
    const contents = fs.readFileSync(__dirname + "/svg/" + file, "utf8");
    const regex = / d="([^']*?)"/i;
    const match = contents.match(regex);
    let fileName = file.split(".")[0];

    if (fileName.includes("|")) {
      let parts = fileName.split("|");
      fileName = parts[0];
      parts.shift();

      parts.forEach(function(part) {
        aliases.push({
          alias: part,
          name: fileName
        });
      });
    }

    if (match && match[1]) {
      stream.write(`"${fileName}": "${match[1]}", \n`);
    }
  });

  stream.write("}; \n\n");
  stream.write("export const aliases = {\n");

  aliases.forEach(function(alias) {
    stream.write(`"${alias.alias}": "${alias.name}", \n`);
  });

  stream.write("};");
  stream.end();
});
