cwifs.setup()
function exec(str){
    comm=str.split(" ")[0]
    if(str.split(" ").length>1){
        str=(str.slice((str.split(" ")[0].length+1),-1)+str.slice(-1)).split(" ")
        str="["+(((str+[]).split(",").map(x => x='"'+x+'"'))+[])+"]" 
        try{
            eres=eval(eval(cwifs.file.read('/bin/'+comm))())
            return eres
        }catch{
            return (comm+": Command not found.")
        }
    }else{
        try{
            str="[]"
            eres=eval(`eval(cwifs.file.read('/bin/'+${comm}))(${str})`)
            return eres
        }catch{
            return (comm+": Command not found.")
        }
    }
}
loadlib=(lib)=>{
    return eval('(eval(cwifs.file.read("/lib/"+lib+".js"))())')
}
// executables and libraries /lib and /bin as an example.
cwifs.file.write("/lib/colors.js","()=>{return {green:(t)=>{return `<green>${t}</green>`}, blue:(t)=>{return `<blue>${t}</blue>`}, red:(t)=>{return `<red>${t}</red>`}}}")
cwifs.file.write("/bin/echo","()=>{return (argv)=>{str='';for(x in argv){x=argv[x];str+=x+' ';}; str=str.slice(0,-1);return str}}")
// library load
lib={
    colors:loadlib("colors")
}
// other text files /etc/motd as an example.
cwifs.file.write("/etc/motd",lib.colors.red("Welcome to WTerm!"))