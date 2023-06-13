import React from "react";
import { Box, Grid, Typography, Button , makeStyles} from "@material-ui/core";
import theme from "../../theme/theme";
import { formatDistance } from "date-fns";

// const skills = ["Javascript", "React", "Node"]
const useStyles = makeStyles((theme)=> ({
    wrapper: {
        border: "1px solid #e8e8e8",
        cursor:"pointer",
        transition: ".3s",
        backgroundColor: "#F5F5DC",
       // padding: "20px",
        margin: "4px",
        borderRadius: "5px",

        "&:hover": {
            boxShadow:"0px 5px 25px rgba(0,0,0,0.1)",
            borderLeft: "5px solid #ecfc38",
        },
        
    },
    companyName: {
        fontSize:' 13.5px',
        backgroundColor: theme.palette.primary.main,
        padding: theme.spacing(0.75),
        borderRadius: "5px",
        display: "inline-block",
        fontWeight: 600,

    },
    skillChip: {
        margin: theme.spacing(0.5),
        padding: theme.spacing(0.75),
        fontSize: "14.5px",
        borderRadius: "5px",
        transition: ".3s",
        fontWeight: 400,
        backgroundColor: theme.palette.secondary.main,
        color: "#fff"
    }
}))
export default (props) => {
    const classes = useStyles();

    return (
        <Box p={3} className={classes.wrapper} >
            <Grid container alignItems="center">
                <Grid item xs >
                    <Typography variant="h6">{props.title}</Typography>
                    <Box mt={1}>
                    <Typography  className = {classes.companyName} variant="subtitle2">{props.companyName}</Typography>
                    </Box>
                </Grid>
                <Grid item container xs>
                    {props.skills?.map((skill)=>(
                        <Grid key={skill} className={classes.skillChip} item>
                            {skill}
                        </Grid>
                    ))}

                </Grid>
                <Grid item container direction="column" alignItems="flex-end" xs>
                    <Grid item >
                    <Typography variant="caption">
                        {formatDistance(Date.now(),props.postedOn)} | {props.type} | {props.location}</Typography>
                    </Grid>
                    <Grid item >
                        <Box mt={2}>
                            <Button onClick={props.open} variant="outlined">check</Button>
                        </Box>
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    )
}