const threads=require("./axios")
 console.log(threads.runThreads("http://localhost:3333",4000,4))