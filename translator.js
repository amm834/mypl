const fs = require("mz/fs");
const path = require("path");

async function main() {
  const filename = process.argv[2];
  const outputFilename = path.basename(filename, ".ast") + ".js";
  const contents = (await fs.readFile(filename)).toString();
  const ast = JSON.parse(contents);
  const jsSourceCode = generatorJS(ast, []);
  console.log(jsSourceCode);
  await fs.writeFile(outputFilename, jsSourceCode);
  console.log(`Generated ${outputFilename}`);
}

function generatorJS(statements, declaredVariables) {
  let lines = [];
  for (statement of statements) {
    if (statement.type == "var_assignment") {
      const value = generateJSForExpression(statement.value);
      if (declaredVariables.indexOf(statement.varname) === -1) {
        lines.push(`let ${statement.varname} = ${value};`);
        declaredVariables.push(statement.varname);
      } else {
        lines.push(`${statement.varname} = ${value}`);
      }
    } else if (statement.type === "print_statement") {
      const expression = generateJSForExpression(statement.expression);
      lines.push(`console.log(${expression});`);
    } else if (statement.type === "while_loop") {
      const condition = generateJSForExpression(statement.condition);
      const body = generatorJS(statement.body, declaredVariables)
                    .split("\n")
                    .map(line => "  " + line)
                    .join("\n");
      lines.push(`while(${condition}){\n${body}\n}`);
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
      return `${right} ${operator} ${left};`;
    }
  } else {
    return expression;
  }
}

main();