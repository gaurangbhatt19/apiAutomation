var  axios=require("axios")
class apiThreads{
    constructor(){
        this.threads=require("axios")
        this.api_details={
         url:"",
         api_name:"",
         username:"",
         threads:1,
         expected_rescode:200,
         delay:0,
         api_type:"JSON",
         request:{},
         headers:{},
        }
        this.delay = ms => new Promise(resolve => setTimeout(resolve, ms))
        this.arrayValue = [];
        this.results=[]
    }

async threads(delay,threads,url) {
    
  for(var i=0;i<threads;i++){
    console.log("threads")
    await this.delay(delay)
    console.log("delay")
    // let result=await Promise.resolve(arrayValue[i](url));
    // this.results.push(result.status);
    // console.log(this.results,"result")
  }

}

async arrayFunction(url) {
    console.log(url)
  return await axios({
    method: 'get',
    url: url,
  });
}
   
    runThreads(url,api_name,username,threads,expected_rescode,delay,api_type,request,headers){
        this.api_details.url=url
        console.log(this.api_details.url)
        this.api_details.username=username
        this.api_details.threads=threads
        this.api_details.expected_rescode=expected_rescode
        this.api_details.delay=delay
        console.log(this.api_details.delay)
        this.api_details.api_name=api_name
        this.api_details.request=JSON.parse(request)
        this.api_details.headers=JSON.parse(headers)
        this.api_details.api_type=api_type
        console.log("thread")
        // for(var i=0;i<threads;i++){
        //     this.arrayValue.push(this.arrayFunction);
        //     console.log(this.arrayValue)
        // }

        this.threads(this.api_details.delay,this.api_details.threads,this.api_details.url)
        console.log("thread")
    }

}

module.exports.apiThreads=apiThreads