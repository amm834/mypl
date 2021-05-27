program -> variable_initialization {% id %}
        | number {% id %}

variable_initialization -> var_identifier _ "=" _ number {%
    data => {
        return {
            type : "variable_initialization",
            var_name :  data[0],
            value : data[4]
        }
    }
%}

var_identifier -> [A-z]:+ {%
    data => data[0].join('')
%}

number -> digit {%
   data => Number(
    data[0]
    )
%} 
        | decimal {% id %}

decimal -> digit "." digit {%
    data => Number(
     data[0] + "." + data[2]
    )
%}

digit -> [0-9]:+ {%
    data => data[0].join('')
%}

# White Space

_ -> [ ]:*
__ -> [ ]:+