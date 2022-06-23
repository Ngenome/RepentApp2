export default function checkIfAnyisEmpty(items:Array<Array<string>>, setError:any, complete:string){
    for(var i=0; i<items.length;i++){
    if(items[i][0]==""){
    setError(`${items[i][1]} ${complete}`)
    console.log(items[i][1])
    return true
}
    }
return false;
}