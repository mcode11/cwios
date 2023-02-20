// init cwifs
cwifs.setup()
// declare functions
function exec(str){
    comm=str.split(" ")[0]
    if(str.split(" ").length>1){
        str=(str.slice((str.split(" ")[0].length+1),-1)+str.slice(-1)).split(" ")
        str="["+((str.map(x => x='`'+x+'`'))+[])+"]" 
        try{
            eres=eval(`eval(cwifs.file.read('/bin/'+'${comm}'))()(${str})`)
            return eres
        }catch(e){
            console.log(e)
            return (comm+"<blue>:</blue> <red>An error occured.</red>")
        }
    }else{
        try{
            str="[]"
            eres=eval(`eval(cwifs.file.read('/bin/'+'${comm}'))()(${str})`)
            return eres
        }catch(e){
            console.log(e)
            return (comm+"<blue>:</blue> <red>An error occured.</red>")
        }
    }
}
loadlib=(libr)=>{
    return eval('eval(cwifs.file.read("/lib/'+libr+'.js"))()')
}
// executables and libraries, take /lib and /bin as an example.
cwifs.file.write("/lib/colors.js","()=>{return {green:(t)=>{return `<green>${t}</green>`}, blue:(t)=>{return `<blue>${t}</blue>`}, red:(t)=>{return `<red>${t}</red>`}}}")
cwifs.file.write("/bin/echo","()=>{return (argv)=>{str='';for(x in argv){x=argv[x];str+=x+' ';}; str=str.slice(0,-1);return str}}")
cwifs.file.write("/bin/green","()=>{return (argv)=>{str='';for(x in argv){x=argv[x];str+=x+' ';}; str=str.slice(0,-1);return lib.colors.green(str)}}")
cwifs.file.write("/bin/red","()=>{return (argv)=>{str='';for(x in argv){x=argv[x];str+=x+' ';}; str=str.slice(0,-1);return lib.colors.red(str)}}")
cwifs.file.write("/bin/blue","()=>{return (argv)=>{str='';for(x in argv){x=argv[x];str+=x+' ';}; str=str.slice(0,-1);return lib.colors.blue(str)}}")
cwifs.file.write("/bin/pi","()=>{return (argv)=>{return Math.PI}}")
cwifs.file.write("/bin/node",`()=>{return (argv)=>{results=[]; for(code in argv){code=argv[code]; results.push(eval(code)); }; return (results+[]).replaceAll(',',', ')}}`)
cwifs.file.write("/bin/locals",'()=>{return (argv)=>{if(argv[0]=="get"){return eval(`window.localStorage.${argv[1]}`);}else if(argv[0]=="set"){eval(`window.localStorage.${argv[1]}=`+`"${argv[2]}"`); return argv[1] + " in local storage is set to `"+argv[2]+"`";}else if(argv[0]=="clear"){window.localStorage.clear(); return "Local storage cleared.";}}}')
// load libraries
lib={
    colors:loadlib("colors")
}
// declare userfs
cwifs.file.write("/home/.user","guest")
cwifs.file.write("/home/"+cwifs.file.read("/home/.user")+"/.motd","true\n"+lib.colors.red("Hello, "+cwifs.file.read("/home/.user")+"! Welcome to cwiOS!"))
// other text files, take /etc/motd as an example.
if (eval(cwifs.file.read("/home/"+cwifs.file.read("/home/.user")+"/.motd").split("\n")[0])){cwifs.file.write("/etc/motd",cwifs.file.read("/home/"+cwifs.file.read("/home/.user")+"/.motd").split("\n")[1])}else{cwifs.file.write("/etc/motd",lib.colors.red("Welcome to cwiOS!"))}