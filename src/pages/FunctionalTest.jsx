import { Button, Grid,TextField, Tabs, Tab, Box } from '@material-ui/core'
import PlayArrowRoundedIcon from '@material-ui/icons/PlayArrowRounded';
import { makeStyles } from '@material-ui/styles'
import React,{useState,useRef} from 'react'
import Header from '../components/Header'
import SaveIcon from '@material-ui/icons/Save';
import axios from "axios"
import { classesValue } from '../style_classes/classes';

const Stopwatch = require('statman-stopwatch');

const FunctionalTest = () => {
    var jsonFormat = require('json-format');
    var xmlFormat = require('xml-formatter');
    const[url,setURL]=useState(" ")
    const[api_type,set_apiType]=useState("JSON")
    const[http_method,setHttpMethod]=useState("POST")
    const[value,setValue]=useState(0)
    const[valueHeaders,setValueHeaders]=useState(0)
    const[request,setRequest]=useState("")
   const[headers,setHeaders]=useState('{\n\t"Content-Type":"application/json"\n}')
   const[api_response,setAPIResponse]=useState([])
   const[headers_response,setHeadersResponse]=useState([])
    const api_name=useRef("")
    const tag_name=useRef("")
    const [responseCode,setResponseCode]=useState("")
    const [elapsedtime,setElapsedTime]=useState(0)
   


    
        const classes=makeStyles(
        classesValue
            )()
        
        function requestFormat(){
            var requests;
            console.log(isJson(request))
            isJson(request)?requests=JSON.parse(request):requests=xmlFormat(request)
            isJson(request)?setRequest(jsonFormat(requests)):setRequest(xmlFormat(requests))
        }
        function headersFormat(){
            var headersValues;
            headersValues=JSON.parse(headers);
            setHeaders(jsonFormat(headersValues))
        }


        function isJson(response){
            try{

                typeof response==="string"?JSON.parse(response):JSON.stringify(response);
            }catch(error){
                return false
            }
            return true
        }

       async function runAPI(url,apiType,httpMethod,request,headers){
            let requestValue
            
            if(apiType==="JSON"){
                
                request.length===0?requestValue="":requestValue=JSON.parse(request);
                
            }
            else if(apiType==="XML"){
                requestValue=xmlFormat(request)
            }
           
            var resValue
            var headersValue
            var responseText
            var responseheaders

            headers=JSON.parse(headers)
            const stopwatch = new Stopwatch();
            stopwatch.start()

            if(httpMethod==="POST"){
                await axios.post(url,requestValue,{
                    headers:headers,
                    mode:"cors"
                }).then(async(response)=>{
                    // API respose
    
                   resValue=await response.data
                   headersValue=await response.headers
                   
                   responseText=isJson(resValue)?jsonFormat(resValue):xmlFormat(resValue)
                   responseheaders=jsonFormat(headersValue)
                   
                   setAPIResponse(responseText)
                   setHeadersResponse(responseheaders)
                   var elapsed_time=stopwatch.read(2)
                   setElapsedTime(elapsed_time)
                   setResponseCode(response.status)
                   stopwatch.stop()
                }).catch(async (error)=>{
                
                    if(error.response){
                       
                        resValue=await error.response.data
                        headersValue=await error.response.headers
                        responseText=isJson(resValue)?jsonFormat(resValue):xmlFormat(resValue)
                        responseheaders=jsonFormat(headersValue)
                        setAPIResponse(responseText)
                        setHeadersResponse(responseheaders)
                        var elapsed_time=stopwatch.read(2)
                       setElapsedTime(elapsed_time)
                     
                       setResponseCode(error.response.status)
                       stopwatch.stop()
                        
                    }
                    else{
                    setAPIResponse("\n\n Error !!!!!!! \n\n Error Message:\t" +error.message)
                    setResponseCode("")
                    setElapsedTime("")
                    stopwatch.stop()
                  
                    }


                    
                })
            }
            else if(httpMethod==="GET"){
                await axios.get(url,requestValue,{
                    headers:headers,
                    mode:"cors"
                }).then(async(response)=>{
                    // API respose
    
                   resValue=await response.data
                   headersValue=await response.headers
                   var responseText=api_type==="JSON"?jsonFormat(resValue):xmlFormat(resValue)
                   var responseheaders=jsonFormat(headersValue)
                   setAPIResponse(responseText)
                   setHeadersResponse(responseheaders)
                   var elapsed_time=stopwatch.read(2)
                   setElapsedTime(elapsed_time)
                   setResponseCode(response.status)
                   stopwatch.stop()
                }).catch(async(error)=>{
                    if(error.response){
                        
                        resValue=await error.response.data
                        headersValue=await error.response.headers
                        responseText=isJson(resValue)?jsonFormat(resValue):xmlFormat(resValue)
                        responseheaders=jsonFormat(headersValue)
                        setAPIResponse(responseText)
                        setHeadersResponse(responseheaders)
                        var elapsed_time=stopwatch.read(2)
                       setElapsedTime(elapsed_time)
                       
                       setResponseCode(error.response.status)
                       stopwatch.stop()
                        
                    }
                    else{
                    setAPIResponse("\n\n Error !!!!!!! \n\n Error Message:\t" +error.message)
                    setResponseCode("")
                    setElapsedTime("")
                    stopwatch.stop()
                    
                    }
                })
            }
            

            

        }

     
        const sampleHeaders={
            "Accept":"application/json;application/xml",
            "Accept-Encoding": "gzip, deflate"
          }
          const sampleXML='<root><content><p xml:space="preserve">This is <b>some</b> content.</content></p>'

          const sampleJson={
               name:"Developer",
               value:1
          }

  return (
    <>
    <div className={classes.pageData}>
        <Grid container spacing={1}>
             <Header heading="Funtional Test" md="8" />
             
             <Grid item md={1}>
                 <Button variant="contained" startIcon={<PlayArrowRoundedIcon/>} style={{backgroundColor:"#00FF00"}} onClick={()=>{
                     runAPI(url,api_type,http_method,request,headers)
                 }} >Run</Button>
             </Grid>
             <Grid item md={1}>
                 <Button variant="contained" startIcon={<SaveIcon/>} style={{backgroundColor:"#87CEFA"}}>Save</Button>
             </Grid>
             <Grid item md={2}>
                 <Button variant="outlined" startIcon={<PlayArrowRoundedIcon/>} style={{backgroundColor:"#00FF00"}} onClick={()=>{
                    
                 }} >Unit Test</Button>
             </Grid>
             <Grid item md={12}>
                 <TextField fullWidth required placeholder="Enter URL" variant="outlined" label="URL" error={url===""} helperText={url===""?"Enter URL":" "} onChange={(event) =>{
                     setURL(event.target.value)
                 }}/>
             </Grid>
             <Grid item md={2}>
                 <TextField variant="standard" label="API Name" reuired inputRef={api_name} />
             </Grid>
             <Grid item md={2}>
                 <TextField variant="standard" label="Tag Name" reuired inputRef={tag_name} />
             </Grid>
             <Grid item md={2}>
                 <TextField
                 id="api_type"
                 select
                 label="API Type"
                 value={api_type}
                 onChange={(event)=>{
                     set_apiType(event.target.value)
                    event.target.value==="XML"?setHeaders('{\n\t"Content-Type":"application/xml"\n}'):setHeaders('{\n\t"Content-Type":"application/json"\n}')
                    }}
                 SelectProps={{
                     native: true,
                    }}
                 helperText="Please Select a API Type"
                 variant="outlined"
                 >
                    <option className={classes.options} key="JSON" value="JSON">
                        JSON
                    </option>
                    <option className={classes.options} key="XML" value="XML">
                        XML
                    </option>
         
                 </TextField>
             </Grid>

             <Grid item md={2}>
                 <TextField
                 id="http_method"
                 select
                 label="HTTP Method"
                 value={http_method}
                 onChange={(event) =>setHttpMethod(event.target.value)}
                 SelectProps={{
                     native: true,
                    }}
                 helperText="HTTP method"
                 variant="outlined"
                 >
                    <option key="POST" value="POST">
                        POST
                    </option>
                    <option key="GET" value="GET">
                        GET
                    </option>
         
                 </TextField>
             </Grid>
        </Grid> 

        <Grid container spacing={4}>
            <Grid item md={6}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={value} onChange={(e,val)=>{
                setValue(val)
            }}>
                <Tab label="Request" />
                <Tab label="Headers"/>
            </Tabs>
            </Box>

            <>
                <br/>
                {
                value===0?<TextField  multiline value={request} onChange={(event)=>{
                    setRequest(event.target.value)
                }} variant="outlined" label="Request Body" rows={16} fullWidth color="secondary" placeholder={"\nSample Json \n\n"+ jsonFormat(sampleJson)+"\n\n Sample XML\n\n"+xmlFormat(sampleXML) } InputProps={{spellCheck: 'false',className:classes.requestValue,endAdornment:<Button variant="contained" color="primary" style={{marginTop: '250px'}} onClick={()=>{
                    requestFormat()
                }}>Pretty</Button> }} />
                :<TextField value={headers} onChange={(event)=>{
                    setHeaders(event.target.value)
                }} multiline variant="outlined" label="API Headers" rows={16} fullWidth color="secondary" placeholder={"\nSample Headers \n\n\n\n"+jsonFormat(sampleHeaders) } InputProps={{spellCheck: 'false',classeName:classes.requestHeader,endAdornment:<Button variant="contained" color="primary" style={{marginTop: '250px'}} onClick={()=>{
                    headersFormat()
                }}>Pretty</Button>  }} />
                }
            </>
        </Grid>

        <Grid item md={6} >
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={valueHeaders} onChange={(e,val)=>{
                setValueHeaders(val)
            }}>
                <Tab label="Response" />
                <Tab label="Headers"/>
            </Tabs>
            </Box>
            <br/>
            <>
           
                {
                valueHeaders===0?<TextField InputProps={{
                    readOnly:true,
                    className: classes.responseValue
                }} multiline mt={2} value={api_response} variant="filled" label="API Response" rows={12} fullWidth color="secondary" />
                :<TextField InputProps={{
                    readOnly:true,
                    className: classes.responseValue
                }} multiline mt={2} value={headers_response} variant="filled" label="Response Headers" rows={12} fullWidth color="secondary" />
                }
                <br/><br/>
               <TextField defaulValue={responseCode} value={responseCode} color="secondary" vairant="outlined" label="Response Code" InputProps={{readOnly:true}}/>
               &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
               <TextField defaultValue={elapsedtime} value={elapsedtime} color="secondary" vairant="outlined" label="Elapsed Time (ms)" InputProps={{readOnly:true,className:classes.expected_responsetime}} />
            </>
            
            </Grid>
        
            

        </Grid>
    </div>
    </>
  )
}

export default FunctionalTest