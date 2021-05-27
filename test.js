// Generated automatically by nearley, version 2.20.1
// http://github.com/Hardmath123/nearley
(function () {
function id(x) { return x[0]; }
var grammar = {
    Lexer: undefined,
    ParserRules: [
    {"name": "program", "symbols": ["variable_initialization"], "postprocess": id},
    {"name": "program", "symbols": ["number"], "postprocess": id},
    {"name": "variable_initialization", "symbols": ["var_identifier", "_", {"literal":"="}, "_", "number"], "postprocess": 
        data => {
            return {
                type : "variable_initialization",
                var_name :  data[0],
                value : data[4]
            }
        }
        },
    {"name": "var_identifier$ebnf$1", "symbols": [/[A-z]/]},
    {"name": "var_identifier$ebnf$1", "symbols": ["var_identifier$ebnf$1", /[A-z]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "var_identifier", "symbols": ["var_identifier$ebnf$1"], "postprocess": 
        data => data[0].join('')
        },
    {"name": "number", "symbols": ["digit"], "postprocess": 
        data => Number(
         data[0]
         )
        },
    {"name": "number", "symbols": ["decimal"], "postprocess": id},
    {"name": "decimal", "symbols": ["digit", {"literal":"."}, "digit"], "postprocess": 
        data => Number(
         data[0] + "." + data[2]
        )
        },
    {"name": "digit$ebnf$1", "symbols": [/[0-9]/]},
    {"name": "digit$ebnf$1", "symbols": ["digit$ebnf$1", /[0-9]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "digit", "symbols": ["digit$ebnf$1"], "postprocess": 
        data => data[0].join('')
        },
    {"name": "_$ebnf$1", "symbols": []},
    {"name": "_$ebnf$1", "symbols": ["_$ebnf$1", /[ ]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "_", "symbols": ["_$ebnf$1"]},
    {"name": "__$ebnf$1", "symbols": [/[ ]/]},
    {"name": "__$ebnf$1", "symbols": ["__$ebnf$1", /[ ]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "__", "symbols": ["__$ebnf$1"]}
]
  , ParserStart: "program"
}
if (typeof module !== 'undefined'&& typeof module.exports !== 'undefined') {
   module.exports = grammar;
} else {
   window.grammar = grammar;
}
})();
