import { Grid, makeStyles, TextField ,Typography,Button} from '@material-ui/core'
import React, { useState,useRef } from 'react'
import 'react-json-pretty/themes/monikai.css';
import SaveIcon from '@material-ui/icons/Save';
import PlayArrowRoundedIcon from '@material-ui/icons/PlayArrowRounded';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {useNavigate} from "react-router-dom";
import { classesValue } from '../style_classes/classes';

var jsonFormat = require('json-format');
var xmlFormat = require('xml-formatter');

const DashBoard = () => {
  
  const classes =makeStyles(
    classesValue
    )()

  const sampleHeaders={
    "Accept":"application/json;application/xml",
    "Accept-Encoding": "gzip, deflate"
  }
  const sampleJson={
       name:"Developer",
       value:1
  }
  const sampleXML='<root><content><p xml:space="preserve">This is <b>some</b> content.</content></p>'

  const [api_type,set_apiType]=useState("JSON")
  const[urlData,setUrlData]=useState(" ")
  const[project_name,setProjectName]=useState(" ")
  const[username,setUsername]=useState(" ")

  const[threadNum,setThreadNum]=useState(1)
  const[delayTime,setDelayTime]=useState(0)
  
  
  const requestData=useRef()
  const expected_rescode=useRef(200)

  function prettyData(){
    if(api_type === "JSON"){
    const jsonData=JSON.parse(requestData.current.value)
    console.log(typeof(jsonData),"json")
    const json=jsonFormat(jsonData)
    console.log(json)
    requestData.current.value=json
  }
  else if(api_type === "XML"){
    const xmlData=requestData.current.value
    const xml=xmlFormat(xmlData)
    requestData.current.value=xml
  }
  }
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  

  
  function runAPI(){
    if(urlData!==" " && project_name !==" " && username!==" "){
     var apiInfo={
     projectName:project_name,
     username:username,
     threads:threadNum,
     expected_rescode:expected_rescode.current.value===""?200:expected_rescode.current.value,
     delay:delayTime,
     apiType:api_type
   }  
  }
 return apiInfo
  }
  const navigate=useNavigate()

  return (
   <>
   <div className={classes.pageData}>
     <Grid container spacing={4}>
       <Grid item md={10} xs={12}>
         <Typography variant="h4" mt={8}>API Dashboard</Typography>
       </Grid>
       <Grid item md={1}>
         <Button variant="contained" startIcon={<PlayArrowRoundedIcon/>} style={{backgroundColor:"#00FF00"}} onClick={()=>{
          handleClickOpen();
         }}  >Run</Button>
         <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
        <Typography variant="h5">Confirm Run</Typography> 
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
             <Typography variant="subtitle1">Do you want to Run API test ?</Typography> 
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} style={{backgroundColor:"red",color:"white"}} >Disagree</Button>
          <Button onClick={()=>{
            let info=runAPI()
            navigate("/runner",{state:info})
          }} autoFocus style={{backgroundColor:"green",color:"white"}}>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    
       </Grid>
       <Grid item md={1}>
       <Button variant="contained" startIcon={<SaveIcon />} style={{backgroundColor:"#87CEFA"}}>Save</Button>
       </Grid>
       <Grid item md={12} xs={12}>
         <TextField variant="outlined" required label="Api URL" id="api_url" color="primary" fullWidth placeholder="Enter URL" error={urlData === ""} helperText={urlData === "" ? 'Enter URL' : ' '} onChange={(e)=>{
           setUrlData(e.target.value)
         }}/>
       </Grid>
       <Grid item md={2} xs={12}>
         <TextField label="Project Name" id="project_name" variant="standard" color="primary" required error={project_name===""} helperText={project_name === ""?"Enter Project name":" "} onChange={(e)=>{
           setProjectName(e.target.value)
         }}/>
       </Grid>
       <Grid item md={2} xs={12}>
         <TextField label="Username" variant="standard" id="username" color="primary" required error={username===""} helperText={username === ""?"Enter Username":" "} onChange={(e)=>{
           setUsername(e.target.value)
         }}/>
       </Grid>
       <Grid item md={2} xs={12}>
         <TextField label="Threads" variant="standard" id="threads" color="primary" type="number" value={threadNum} onChange={(event)=>{
           setThreadNum(event.target.value)
         }}/>
       </Grid>
       <Grid item md={2} xs={12}>
         <TextField label="Expected Rescode" variant="standard" id="res_code" color="primary" type="number" inputRef={expected_rescode} />
       </Grid>
       <Grid item md={2} xs={12}>
         <TextField label="Delay Seconds" variant="standard" id="delay" color="primary" type="number" value={delayTime} onChange={(event)=>{
           setDelayTime(event.target.value)
         }}/>
       </Grid>
       <Grid item md={2} xs={12}>
       <TextField
          id="api_type"
          select
          label="API Type"
          value={api_type}
          onChange={(event)=>{
            set_apiType(event.target.value)
          }}
          SelectProps={{
            native: true,
          }}
          helperText="Please Select a API Type"
          variant="outlined"
        >
          <option style={{padding: 10}}key="JSON" value="JSON">
              JSON
          </option>
          <option key="XML" value="XML">
              XML
          </option>
         
        </TextField>
        
       </Grid>
       <Grid item md={6} xs={6}>
         <TextField fullWidth mt={10} label="Request Body" id="request_data" color="secondary" rows={18} placeholder={"\nSample Json \n\n"+ jsonFormat(sampleJson)+"\n\n\n\n Sample XML\n\n"+xmlFormat(sampleXML) } multiline variant="filled" inputRef={requestData}/>
       </Grid>
       <Grid item md={6} xs={6}>
         <TextField fullWidth label="Headers Data in Json Format" id="header_data" color="secondary" rows={18} placeholder={"\nSample Headers \n\n\n\n"+jsonFormat(sampleHeaders) } multiline variant="filled"/>
       </Grid>
       <Grid item md={6} xs={12}>
          <Button variant="contained" color="primary" onClick={prettyData}>Pretty</Button>
       </Grid>
      
     </Grid>
   </div>
   
   </>
  )
}

export default DashBoard