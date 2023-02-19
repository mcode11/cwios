var term = new Terminal();
term.open(document.getElementById('terminal'));
term.prompt = () => { term.write('\r\n$ '); };
term.writeln('This is a shell emulator.'); 
term.prompt(); // Move curr_line outside of async scope. 
var curr_line = ''; 
term.on('key', function(key, ev) { const printable = !ev.altKey && !ev.altGraphKey && !ev.ctrlKey && !ev.metaKey; if (ev.keyCode === 13) { term.prompt(); console.log(curr_line); curr_line = ''; } else if (ev.keyCode === 8) { if (term.x > 2) { curr_line = curr_line.slice(0, -1); term.write('\b \b'); } } else if (printable) { curr_line += ev.key; term.write(key); } });
term.on('paste', function(data) { term.write(data); });
function exec(str){
    comm=str.split(" ")[0]
    str=(str.slice((str.split(" ")[0].length+1),-1)+str.slice(-1)).split(" ")
}