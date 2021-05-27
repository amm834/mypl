const fs = require("mz/fs");
const path = require("path");

async function main() {
  const filename = process.argv[2];
  const outputFilename = path.basename(filename, ".ast") + ".js";
  const contents = (await fs.readFile(filename)).toString();
  const ast = JSON.parse(contents);
  const jsSourceCode = generatorJS(ast);
  console.log(jsSourceCode);
  await fs.writeFile(outputFilename, jsSourceCode);
  console.log(`Generated ${outputFilename}`);
}

function generatorJS(statements) {
  let lines = [];
  for (statement of statements) {
    if (statement.type == "var_assignment") {
      const value = generateJSForExpression(statement.value);
      lines.push(`let ${statement.varname} = ${value};`);
    } else if (statement.type === "print_statement") {
      const expression = generateJSForExpression(statement.expression);
      lines.push(`console.log(${expression});`);
      
    }
  }
  return lines.join("\n");
}

function generateJSForExpression(expression) {
  if (typeof expression === "object") {
    if (expression.type === "binary_expression") {
      const left = generateJSForExpression(expression.left);
      const right = generateJSForExpression(expression.right);
      const operator = expression.operator;
      return `${right} ${operator} ${left}`;
    }
  } else {
    return expression;
  }
}

main();