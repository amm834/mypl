const nearley = require("nearley");
const grammar = require("./grammer.js");

// Create a Parser object from our grammar.
const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));

// Parse something!
try {
  parser.feed("a=123");
  
  console.log("Parsed => ",parser.results);
}catch(e) {
  console.log("Unexpected Error: ", `${e.message}`)
}
// parser.results is an array of possible parsings.