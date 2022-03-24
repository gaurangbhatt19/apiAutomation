import React from 'react'
import { Grid, Typography } from '@material-ui/core'

const Header = ({heading,md}) => { 
  return (
    <>
        <Grid item md={md} xs={12}>
            <Typography variant="h4" mt={8}>{heading}</Typography>
        </Grid>
    </>
  )
}

export default Header