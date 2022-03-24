var jsonFormat = require('json-format');
var xmlFormat = require('xml-formatter');
function isValidUrl(api_url){
    try {
        let url = new URL(api_url);
        return true
      } catch (_) {
        return false;  
      }
}
function isJson(response){
    try{

        typeof response==="string"?JSON.parse(response):JSON.stringify(response);
    }catch(error){
        return false
    }
    return true
}

function getUniqueID(){
    return + new Date.now()
}

export {isValidUrl,isJson};