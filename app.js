var term = new Terminal();
term.open(document.getElementById('terminal'));
term.write('Hello from \x1B[1;3;31mxterm.js\x1B[0m $ ')
alert(term.read())
function exec(str){
comm=str.split(" ")[0]
str=(str.slice((str.split(" ")[0].length+1),-1)+str.slice(-1)).split(" ")

}