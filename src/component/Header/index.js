import React from "react";
import { Box, Typography, Grid, Button } from "@material-ui/core";


export default (props) => (
    <Box py={10} bgcolor="secondary.main" color="white">
        <Grid container justifyContent="center">
            <Grid item xs={10}>
                <Box display="flex" justifyContent="space-between">
                    <Box>
                    <Typography variant="h2" display="block">
                        
                        Online Job portal
                        
                    </Typography>
                    </Box>
                    <Box  mt={5}>
                    <Button onClick={props.openJobModal} variant="contained" color="primary" size="large" >
                        Post a job
                    </Button>
                    </Box>
                </Box>
            </Grid>
        </Grid>
    </Box>
);