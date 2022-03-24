const axios=require("axios")
const delay = ms => new Promise(resolve => setTimeout(resolve, ms))
async function threads(arrayValue,url,delayValue,threadsValue) {
  var results=[]
  for(var i=0;i<threadsValue;i++){
    
    await delay(delayValue)
    var result=await Promise.resolve(arrayValue[i](url));
    
    results.push(result.status);
    console.log(results,"result")
  }

}

async function arrayFunction(url) {
  return await axios.get(url);
}


function arrFunction(threadsValue){
  var arrayValue=[]
for (var i = 1; i <= threadsValue; i++) {
  arrayValue.push(arrayFunction);
}
return arrayValue
}

function runThreads(url,delay,threadsValue){
var arrayValue=arrFunction(threadsValue)
threads(arrayValue,url,delay,threadsValue)
}
module.exports={runThreads}