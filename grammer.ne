program ->
         var_assignment         {% id %} 
        | print_statement       {% id %}

print_statement -> "print" __ expression
    {%
        data => {
            return {
                type : "print_statement",
                expression : data[2]
            }
        }
    %}
    
expression 
        -> unary_expression     {% id %}
         | binary_expression    {% id %}

unary_expression
        -> identifier           {% id %}
         | number               {% id %}

binary_expression -> unary_expression _ operator _ expression
    {%
        data => {
            return {
                type : "binary_expression",
                right : data[0],
                operator : data[2],
                left : data[4]
            }
        }
    %}

operator 
        -> "+" {% id %}
         | "-" {% id %}
         | "*" {% id %}
         | "/" {% id %}
         | "%" {% id %}

var_assignment -> identifier _ ":=" _ expression 
    {%
    
         data =>  {
         return {
            type : "var_assignment",
            varname : data[0],
            value : data[4]
            }
        }
        
    %}

identifier -> [A-z]:+ 
        {% 
                
            data => data[0].join('')

        %}

number -> digits 
        {% 
            data => Number(
            data[0]
            )
        %}
        | digits "." digits 
         {%
         
                data => Number(
                data[0] + "." + data[2]
                )
                
        %}

digits -> [0-9]:+ 
    {%
    
    data => data[0].join('')

    %}
    

_ -> [ ]:*
__ -> [ ]:+