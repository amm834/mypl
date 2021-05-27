const nearley = require("nearley");
const grammar = require("./grammer.js");
const fs = require('mz/fs');
const path = require('path');


async function main() {
    // create parser instance
    const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));
    const filename = process.argv[2];
    const outputFilename = path.basename(filename, ".mypl") + ".ast";
    const sourceCode = (await fs.readFile(filename)).toString();
    try {
        parser.feed(sourceCode);
        const ast = parser.results[0];
        await fs.writeFile(outputFilename,JSON.stringify(ast,null));
        console.log("Parsed Successfully.");
        console.log(`${outputFilename} is created.`);
    }catch(e) {
        console.log("Unexpected", `${e.message}`)
    }
}
main();