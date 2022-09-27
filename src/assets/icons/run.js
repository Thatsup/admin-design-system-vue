const fs = require("fs"),
  files = fs.readdirSync(__dirname + "/svg/");

var stream = fs.createWriteStream(__dirname + "/icons.js");
stream.once("open", function() {
  let aliases = [];

  stream.write("export const icons = {\n");

  files.forEach(function(file) {
    if(extension(file) !== 'svg') {
      return;
    }
    const contents = fs.readFileSync(__dirname + "/svg/" + file, "utf8");
    let def = contents.replace(/<\/?svg([^>]*)>/ig, '');
    def = def.replace(/[\t\n\r]/g,'')
    def = def.replace(/(fill|stroke)="#([^"]+)"/g,'$1="currentColor"')
    def = def.replace(/(fill|stroke):\s*#([^;]+);/g,'$1:currentColor;')
    def = def.replace(/(\s){2,}/g,'$1');

    let fileName = file.split(".")[0];

    if (fileName.includes("_")) {
      let parts = fileName.split("_");
      fileName = parts[0];
      parts.shift();

      parts.forEach(function(part) {
        aliases.push({
          alias: part,
          name: fileName
        });
      });
    }

    if (def) {
      stream.write(`"${fileName}": ${JSON.stringify(def)}, \n`);
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

const extension = function(file) {
  return file.split('.').pop();
};