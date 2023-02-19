var term = new Terminal();
term.open(document.getElementById('terminal'));
term.prompt=()=>{
    term.write("\r\n~ ")
}
term.prompt()
function exec(str){
    comm=str.split(" ")[0]
    str=(str.slice((str.split(" ")[0].length+1),-1)+str.slice(-1)).split(" ")
}