# My Programming Language
Transpiler  that will  give the higher level source code of JS 

This transplier is just for my learning purposes and you can learn this from **@airportyh**'s YouTube channel. 
# Setup

```sh
# Clone This Repo
git clone https://github.com/amm834/mypl
cd mypl/
# Install Deps
npm install
chmod +x run
# Translate and Run
./run source_code.mypl
```

# Todos

- [x] CFG and Parsing
- [x] Generating AST
- [x] Code Generating ~ Translate AST to JS higher level source codes

# Examples

## Variable and Expression

```
a := 100
num := a + 20 + 30
```

## Iteration

```
n := 1
while n > 10 [
print n
n := n + 1
]
```

# Nesting

```
n := 1
while n > 10 [
n := n + 1
print n
n := n + 1
]
```

# Steps of Compilation

## Source Code

```
n := 1
```
## CFG Grammer

```ne
program -> statements {% id %}

statements 
        -> _ statement _
        {% 
            data => [data[1]]
        %}
        
statement ->
         var_assignment         {% id %} 

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
```

## AST

```json
[
	{
		"type": "var_assignment",
		"varname": "n",
		"value": 1
	}
]
```

##.Transpiled Higher Level Code
```js
let n = 1;
```
