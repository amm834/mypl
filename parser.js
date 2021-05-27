const nearley = require("nearley");
const grammar = require("./grammer.js");

// Create a Parser object from our grammar.
const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));

// Parse something!
try {
  parser.feed("print 10 + 49.3 + 10");

  console.log("Parsed => ", parser.results[0]);
}catch(e) {
  
  console.log("Unexpected", `${e.message}`)
}
// parser.results is an array of possible parsings.