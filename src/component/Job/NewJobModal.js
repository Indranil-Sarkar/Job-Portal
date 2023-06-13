import React, { useState } from "react";
import { Box, Button, Grid, FilledInput, Select, MenuItem, IconButton, Dialog, Typography, DialogTitle, DialogContent, DialogActions, makeStyles, CircularProgress } from '@material-ui/core';
import { Close as CloseIcons } from '@material-ui/icons';
const useStyles = makeStyles((theme) => ({
    skillChip: {
        margin: theme.spacing(0.5),
        padding: theme.spacing(0.75),
        fontSize: "14.5px",
        borderRadius: "5px",
        transition: ".3s",
        fontWeight: 600,
        border: `1px solid ${theme.palette.secondary.main}`,
        cursor: "pointer",

        "&:hover": {
            backgroundColor: theme.palette.secondary.main,
            color: "#fff",
        }
    },
    included: {
        backgroundColor: theme.palette.secondary.main,
        color: "#fff",
    }
}))
const initState =  {

    title: "",
    type: "Full Time",
    location: "Remote",
    companyName: "",
    companyUrl: "",
    skills: [],
    description: "",
    link: "",
}
export default (props) => {
    const [loading, setLoading] = useState(false); 
    const classes = useStyles();
    const [jobDetails, setJobDetails] = useState(initState);
    const skills = [
        "Javascript",
        "React",
        "NodeJS",
        "Vue",
        "FireBase",
        "MongoDB",
        "SQL",
    ];

    const handleChange = e => {
        e.persist();
        setJobDetails(oldState => ({ ...oldState, [e.target.name]: e.target.value }))
    }

    const addRemoveSkill = skill => jobDetails.skills.includes(skill)
        ? setJobDetails(oldState => ({ ...oldState, skills: oldState.skills.filter(s => s !== skill) }))
        :
        setJobDetails(oldState => ({ ...oldState, skills: oldState.skills.concat(skill)}))
    // console.log(jobDetails)

    const handleSubmit =async() => {
        for(const field in jobDetails){
            if(typeof jobDetails[field] === "string" && !jobDetails[field] ) {
                alert("Fill all the Required Fileds"); 
                return;
            }
        }
        if(!jobDetails.skills.length){
            alert("Fill all the Required Fileds");
            return;
        }
        setLoading(true);
        await props.PostJob(jobDetails);
        closeModal();
    }
    const closeModal = () => {
        setJobDetails(initState);
        setLoading(false);
        props.closeJobModal();
        console.log("closed");
    }
    return (
        <Dialog open={props.openModal} fullWidth>
            <DialogTitle>

                <Box display="flex" justifyContent="space-between" alignContent="center" >
                    Enter job details
                    <IconButton onClick={closeModal}>
                        <CloseIcons />
                    </IconButton>
                </Box>
            </DialogTitle>
            <DialogContent>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <FilledInput onChange={handleChange} name="title" value={jobDetails.title} placeholder="Job title*" disableunderline fullWidth />
                    </Grid>
                    <Grid item xs={6}>
                        <Select onChange={handleChange} name="type" value={jobDetails.type} variant="filled" defaultValue="Full Time" fullWidth>
                            <MenuItem value="Full Time">Full Time</MenuItem>
                            <MenuItem value="Part Time">Part Time</MenuItem>
                            <MenuItem value="Intern">Intern</MenuItem>
                        </Select>
                    </Grid>


                    <Grid item xs={6}>
                        <FilledInput onChange={handleChange} name="companyName" value={jobDetails.companyName} placeholder="Company name*" disableunderline fullWidth />
                    </Grid>
                    <Grid item xs={6}>
                        <FilledInput onChange={handleChange} name="companyUrl" value={jobDetails.companyUrl} placeholder="Company url*" disableunderline fullWidth />
                    </Grid>
                    <Grid item xs={6}>
                        <Select onChange={handleChange} name="location" value={jobDetails.location} fullWidth variant="filled" defaultValue="Remote">
                            <MenuItem value="Remote">Remote</MenuItem>
                            <MenuItem value="From-Office">From-Office</MenuItem>
                        </Select>
                    </Grid>
                    <Grid item xs={6}>
                        <FilledInput onChange={handleChange} name="link" value={jobDetails.link} placeholder="Job link*" disableunderline fullWidth />
                    </Grid>
                    <Grid item xs={12}>
                        <FilledInput onChange={handleChange} name="description" value={jobDetails.description} multiline rows={4} placeholder="Job description*" disableunderline fullWidth />
                    </Grid>
                </Grid>
                <Box mt={2}>
                    <Typography>Skills:</Typography>
                    <Box display="flex">
                        {skills.map(skill => <Box onClick={() => addRemoveSkill(skill)} className={`${classes.skillChip} ${jobDetails.skills.includes(skill) && classes.included}`} key={skill}>{skill}</Box>)}
                    </Box>
                </Box>
            </DialogContent>
            <DialogActions>
                <Box alignItems="center" color="red" width="100%" display="flex" justifyContent="space-between">
                    <Typography variant="caption">*Required fields</Typography>
                    <Button onClick={handleSubmit} variant="contained" color="primary" disableElevation disable={loading}>
                        {loading ?( <CircularProgress color="secondary" size={22} /> )
                        : 
                        ("Post Job"
                        )}
                        </Button>

                </Box>
            </DialogActions>
        </Dialog>
    )
}