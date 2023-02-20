kpr=""
eval(cwifs.file.read("/lib/colors.js"))
term=document.getElementById("terminal")
term.innerHTML=cwifs.file.read("/etc/motd")+"<br>"
promptw=lib.colors.blue("% ")
cursor=0
function pageScroll() {
    term.scrollBy(0,100); // horizontal and vertical scroll increments
    scrolldelay = setTimeout(pageScroll,0); // scrolls every 100 milliseconds
}
term.clear=(isOnly)=>{
    if(isOnly){
        term.innerHTML=""+promptw
    }else{
        term.innerHTML=""
    }
}
function shell() {
    term.innerHTML+=promptw
    cursor=2
    document.addEventListener("keydown",(e)=>{
        printable = !(e.key.length>1)
        console.log(e.key)
        if(e.key=="Enter"){
            if(kpr.split(" && ").length>1){
                term.innerHTML+="<br>"
                for(z in kpr.split(" && ")){
                    if(kpr.split(" && ")[z]!=="clear"){
                        term.innerHTML+=exec(kpr.split(" && ")[z])
                        term.innerHTML+=""
                    }else{
                        term.clear(false)
                    }
                }
                term.innerHTML+="<br>"+promptw
            }else{
                if(kpr!=="clear"){
                    term.innerHTML+="<br>"
                    term.innerHTML+=exec(kpr)
                    term.innerHTML+="<br>"+promptw
                }else{
                    term.clear(true)
                }
            }
            kpr=""
            cursor=2
        }else if(e.key=="Backspace"||e.key=="Delete"){
            if(cursor!==2){
                term.innerHTML=term.innerHTML.slice(0,-1)
                kpr=kpr.slice(0,-1)
                cursor-=1
            }
        }else{
            if(printable){
                term.innerHTML+=e.key
                kpr+=e.key
                cursor+=1
            }
        }
    })
}
pageScroll()
while(!isOSReady){}
shell()