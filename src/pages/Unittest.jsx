import React,{useState} from 'react'
import {useForm} from "react-hook-form"
import { makeStyles } from '@material-ui/styles'
import {Button, Grid, Typography,TextField} from "@material-ui/core"
import {isValidUrl} from "../services/services" 

import {classesValue} from "../style_classes/classes"
import Header from '../components/Header'
import SaveIcon from '@material-ui/icons/Save';
import PlayArrowRoundedIcon from '@material-ui/icons/PlayArrowRounded';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {useNavigate} from "react-router-dom";
import Requests_Headers from '../components/Requests_Headers'

const Unittest = () => {
  var navigate=useNavigate()

// read file
  async function getFilevalues(file){
    const reader=new FileReader();
    let fileValue
    reader.onload = function(evt) {
      fileValue=  evt.target.result
      setFileValue(fileValue)
      console.log(fileValue,"file");
    };
    reader.readAsText(file)
  }

  const classescss=makeStyles(
    classesValue
  )()
  async function onSubmit(form){
    var formValues=form
    formValues["api_type"]=api_type
    formValues["unittest_filedetails"]=fileValueDetails
    formValues["id"]=formValues.project_name+"_"+formValues.api_name+"_"+formValues.dev_name+"_"+ Date.now()
    formValues["http_method"]=http_method
    
    handleClickOpen();
    if(isValidUrl(formValues.url)){
      setApiDetails(formValues)
      console.log(formValues)
      setInvalidUrl(false)
    }else{
      setInvalidUrl(true)
    }
  }
 
  const {register,handleSubmit}=useForm()
  const [api_type,set_apiType]=useState("JSON")
  const [http_method,set_http_method]=useState("POS")
  const [open, setOpen] = useState(false);
  const [api_details,setApiDetails]=useState({})
  const [fileValueDetails,setFileValue]=useState()
  
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const[invalidUrl,setInvalidUrl]=useState(false)
  
  return (
    <div className={classescss.pageData}>
    <form onSubmit={handleSubmit(onSubmit)}>
    <Grid container spacing={2} mt={4}>
      <Header md={10} heading="Unit Test"/>
      <Grid item md={1}>
        <Button type="submit" variant="contained" startIcon={<PlayArrowRoundedIcon/>} style={{backgroundColor:"#00FF00"}}>Run</Button>
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
          <Button autoFocus style={{backgroundColor:"green",color:"white"}} onClick={()=>{
            navigate("/runner",{state:api_details})
          }}>
            Agree
          </Button>
        </DialogActions>
      </Dialog>  
      </Grid>
      <Grid item md={1}>
        <Button variant="contained" startIcon={<SaveIcon />} style={{backgroundColor:"cyan"}}>Save</Button>
      </Grid>
    </Grid>
    <br/>
    <Grid container spacing={4}>   
      <Grid item md={2}>
        <TextField variant="standard" label="Project Name" required {...register("project_name",{required:true})}/>
      </Grid>
      <Grid item md={2}>
        <TextField variant="standard" label="API Name" required {...register("api_name",{required:true})} />
      </Grid>
      <Grid item md={2}>
        <TextField variant="standard" label="Delay" defaultValue={0} {...register("delay",{min:0,setValueAs:e=>parseInt(e)})} />
      </Grid>
      <Grid item md={2}>
        <TextField variant="standard" label="Username" required {...register("dev_name",{required:true})} />
      </Grid>
      <Grid item md={4}>
        <TextField variant="outlined" color="secondary" required onChange={(e)=>{
          getFilevalues(e.target.files[0])
        }} type="file"/>
      </Grid>
      <Grid item md={8}>
        <TextField variant="outlined" label="URL" error={invalidUrl} helperText={invalidUrl?"Enter valid URL":""} required {...register("url",{required:true})} fullWidth/>
      </Grid>
      <Grid item md={2}>
      <TextField
          id="http_method"
          select
          label="HTTP Method"
          value={http_method}
          onChange={(event)=>{
            set_http_method(event.target.value)
          }}
          SelectProps={{
            native: true,
          }}
          helperText="Select a HTTP Method"
          variant="outlined"
        >
          <option style={{padding: 10}} key="POST" value="POST">
              POST
          </option>
          <option key="XML" value="XML">
              GET
          </option>
         
        </TextField>
      </Grid>
      <Grid item md={2}>
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
          <option style={{padding: 10}} key="JSON" value="JSON">
              JSON
          </option>
          <option key="XML" value="XML">
              XML
          </option>
         
        </TextField>
      </Grid>
      <Requests_Headers/>

    </Grid>
 
</form> 
    </div>
  )
}

export default Unittest