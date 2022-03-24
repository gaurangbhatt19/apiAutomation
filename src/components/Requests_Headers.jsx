import React,{useState} from 'react'
import{useForm} from "react-hook-form"
import {Button, Grid,TextField,Box,Tabs,Tab} from "@material-ui/core"
import { makeStyles } from '@material-ui/styles'
import {classesValue} from "../style_classes/classes"
import { useRecoilState } from 'recoil'
import {requestAtom,headersAtom} from "../statemanagement/atoms"
import {isJson} from "../services/services"

const Requests_Headers = () => {
    const[value,setValue]=useState(0)
    const {register,handleSubmit}=useForm()
    const [requestValue,setrequestValue]=useRecoilState(requestAtom)
    const [headerValue,setheaderValue]=useRecoilState(headersAtom)

    const classescss=makeStyles(
        classesValue
      )()

      const sampleXML='<root><content><p xml:space="preserve">This is <b>some</b> content.</content></p>'

    const sampleJson={
         name:"Developer",
         value:1
    }

    const sampleHeaders={
        "Accept":"application/json;application/xml",
        "Accept-Encoding": "gzip, deflate"
      }
    
      var jsonFormat = require('json-format');
      var xmlFormat = require('xml-formatter');

      function requestFormat(){
        if(isJson(requestValue)){
            console.log(requestValue)
            setrequestValue(jsonFormat(JSON.parse(requestValue)))
        }
        else{
            setrequestValue(xmlFormat(requestValue))
        }
    }
  
    function headersFormat(){
        setheaderValue(jsonFormat(JSON.parse(headerValue)))
    }
  return (
    <Grid item md={6} >
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
                value===0?<TextField {...register("request_body",{required:true})} multiline value={requestValue} onChange={(event)=>{
                    setrequestValue(event.target.value)
                }} variant="outlined" label="Request Body" rows={16} fullWidth color="secondary" placeholder={"\nSample Json \n\n"+ jsonFormat(sampleJson)+"\n\n Sample XML\n\n"+xmlFormat(sampleXML) } InputProps={{spellCheck: 'false',className:classescss.requestValue,endAdornment:<Button variant="contained" color="primary" style={{marginTop: '250px'}} onClick={()=>{
                    requestFormat()
                }}>Pretty</Button> }} />
                :<TextField {...register("request_headers",{required:true})} value={headerValue} onChange={(event)=>{
                    setheaderValue(event.target.value)
                }} multiline variant="outlined" label="API Headers" rows={16} fullWidth color="secondary" placeholder={"\nSample Headers \n\n\n\n"+jsonFormat(sampleHeaders) } InputProps={{spellCheck: 'false',classeName:classescss.requestHeader,endAdornment:<Button variant="contained" color="primary" style={{marginTop: '250px'}} onClick={()=>{
                    headersFormat()
                }}>Pretty</Button>  }} />
                }
            </>
       </Grid>
  )
}

export default Requests_Headers