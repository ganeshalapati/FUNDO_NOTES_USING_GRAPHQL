let countvalue = new Promise(function(req,rej){
    setTimeout(()=>{
        resizeBy("promise reolved")

},2000)
})
async function asyncFunc(){
    let result = await countvalue;
    console.log(result)
    console.log("hello")
}
asyncFunc();
