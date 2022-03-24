import React from 'react'
import {Drawer,makeStyles,List,ListItem,ListItemText,ListItemIcon} from "@material-ui/core"
import {SubjectOutlined} from "@material-ui/icons"
import InfoIcon from '@material-ui/icons/Info';
import CodeIcon from '@material-ui/icons/Code';
import DeveloperModeRoundedIcon from '@material-ui/icons/DeveloperModeRounded';
import AssessmentRoundedIcon from '@material-ui/icons/AssessmentRounded';
import CachedRoundedIcon from '@material-ui/icons/CachedRounded';
import {useNavigate} from "react-router-dom";
import {useLocation} from "react-router"


const NavBar = () => {
    const menuItems=[
        {
          text:"API Threads",
          icon:<DeveloperModeRoundedIcon color="secondary"/>,
          path:"/"
        },
        {
            text:"Projects",
            icon:<SubjectOutlined color="primary"/>,
            path:"/projects_lists"
        },
        {
          text:"Reports",
          icon:<AssessmentRoundedIcon color="secondary"/>,
          path:"/reports_list"
        },
        {
          text:"Unit Testing",
          icon:<DeveloperModeRoundedIcon color="secondary"/>,
          path:"/unit_test"
        },
        {
          text:"Functional Test",
          icon:<CodeIcon color="primary"/>,
          path:"/functional_test"
          
        },{
          text:"Runner",
          icon:<CachedRoundedIcon color="primary"/>,
          path:"/runner"
        }
       ,
         {
          text:"Tutorial",
          icon:<InfoIcon color="secondary"/>,
          path:"/tutorial"
        }
      ]
    

    const drawerWidth=200
    const history=useNavigate()

    const classes=makeStyles({
        navBar:{
          width: drawerWidth
        },
        navBarPaper:{
          width: drawerWidth,
        },
        active:{
            background: '#f4f4f4'
        }
      })()
      
      const pathName=useLocation()
  return (
    <>
    <Drawer 
       className={classes.navBar}
       variant="permanent"
       anchor="left"
       classes={{paper:classes.navBarPaper}}
       >
        <List>
         {
             menuItems.map((item,i)=>(
                 <ListItem key={i} button onClick={()=>{
                     history(item.path)
                 }} className={pathName.pathname===item.path?classes.active:""}>
                     <ListItemIcon>{item.icon}</ListItemIcon>
                     <ListItemText primary={item.text}/>
                 </ListItem>
             ))
         }
        </List>
      </Drawer>
    </>
  )
}

export default NavBar