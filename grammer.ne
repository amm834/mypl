program -> var_assignment {% id %}
        | number {% id %}
        
var_assignment -> identifier "=" number 
    {%
         data =>  {
         return {
            type : "var_assignment",
            varname : data[0],
            value : data[2]
            }
        }
    %}

identifier -> [A-z]:+ {% id %}

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