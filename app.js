function exec(str){
    comm=str.split(" ")[0]
    str=(str.slice((str.split(" ")[0].length+1),-1)+str.slice(-1)).split(" ")
    str="["+(((str+[]).split(",").map(x => x='"'+x+'"'))+[])+"]" 
    eres=eval(`${comm}(${str})`)
    return eres
}
function echo(arr){
    str=""
    for(x in arr){
        x=arr[x]
        str+=x+" "
    }
    str=str.slice(0,-1)
    return str
}
kpr=""
term=document.getElementById("terminal")
term.value=""
promptw="% "
function readline() {
    term.disabled=true
    term.value+=promptw
    document.addEventListener("keypress",(e)=>{
        console.log(e.key)
        if(e.key=="Enter"){
            term.value+="\n"
            term.value+=exec(kpr)
            term.value+="\n"+promptw
            kpr=""
        }else{
            term.value+=e.key
            kpr+=e.key
        }
    })
}
readline()