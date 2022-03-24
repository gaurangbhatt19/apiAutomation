import {Button, Grid, Typography} from "@material-ui/core"
import React,{useEffect, useState} from 'react'
import {useRecoilState} from "recoil"
import { useLocation } from 'react-router'
import { makeStyles } from '@material-ui/styles'
import SaveIcon from '@material-ui/icons/Save';
import {pieAtom,numoftestAtom} from "../statemanagement/atoms"
import axios from "axios"
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import LineGraph from '../components/LineGraph'
import TableValues from '../components/TableValues'

ChartJS.register(ArcElement, Tooltip, Legend);
const Runner = (props) => {
    const {state}=useLocation()
    const classescss=makeStyles({
      pageData:{
        marginTop:20,
        marginLeft:40
      },
      boxGraphs:{
        backgroundColor:"yellow"
      }
    })()

    const[passFail,setPassFail]=useRecoilState(pieAtom)
    const[numberofunittest,setnumberofunittests]=useRecoilState(numoftestAtom)
    
    useEffect(() => {
      setChartValues({
        labels: ['Pass','Fail'],
        datasets: [
          {
            label: '# of Votes',
            data: passFail ,
            backgroundColor: [
              'rgba(54, 162, 235, 0.8)',
            'rgba(255, 99, 132, 0.8)'
            ],
            borderColor: [
              'rgba(54, 162, 235, 1)',
            'rgba(255, 99, 132, 1)'
            ],
            borderWidth: 1,
          },
        ],
      })

    },[passFail])

 
    const[chartValues,setChartValues]=useState({
      labels: ['Pass','Fail'],
      datasets: [
        {
          label: '# of Votes',
          data: passFail ,
          backgroundColor: [
            'rgba(54, 162, 235, 0.8)',
            'rgba(255, 99, 132, 0.8)'
          ],
          borderColor: [
            'rgba(54, 162, 235, 1)',
            'rgba(255, 99, 132, 1)'
          ],
          borderWidth: 1,
        },
      ],
    })
    
    console.log(state)

    function createUnitTestData(){
      const text=state.unittest_filedetails
      const headers=text.split("\r\n")[0].split(",")
      var rows=text.split("\r\n")
      rows.shift()
      setnumberofunittests(rows.length)
      console.log(headers,rows)
    }

    useEffect(()=>{
      createUnitTestData()
    },[])

    async function apiUnit(expectedRescode){
      switch(state.http_method){
        case "GET":
          const response=await axios.get(state.url,state.headers)
          const resCode=await response.status
          resCode===expectedRescode?setPassFail([passFail[0]++,passFail[1]]):setPassFail([passFail[0],passFail[1]++])
          break
        case "POST":

          break
        default:

      }
    }


  return (
    <>
     <div className={classescss.pageData} id="runner">
       
<Grid container spacing={2}>
       <Grid item md={10} xs={12}>
            <Typography variant="h4" mt={8}>Runner</Typography>
        </Grid>
        <Grid item md={1}>
          <Button variant="contained" startIcon={<SaveIcon />}>Save</Button>
        </Grid>
       
        <Grid container>
          <Grid item md={3}>
            <Pie data={chartValues}  />
          </Grid>
          <Grid item md={1}>

          </Grid>
          <Grid item md={8}>
            <LineGraph numberOfUnitTests={numberofunittest} />
          </Grid>
        </Grid>
    </Grid>
    <br/>
       <Grid container>
         <Grid item md={12}>
           <TableValues />
         </Grid>
       </Grid>
    
    </div>
    </>
  )
}

export default Runner