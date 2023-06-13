import React, {useState, useEffect} from "react";
import { Box, Grid, ThemeProvider, CircularProgress } from "@material-ui/core";
import theme from "./theme/theme";
import Header from "./component/Header";
import SearchBar from "./component/SearchBar";
import JobCard from "./component/Job/JobCard";
import NewJobModal from "./component/Job/NewJobModal";
import { db , app} from "./firebase/config";
import {collection, getDocs , addDoc, query, where} from "firebase/firestore";
import { serverTimestamp } from '@firebase/firestore'
import Background from "./img/bg.jpg";
import ViewJobModal from "./component/Job/ViewJobModal";
import { Parallax, ParallaxLayer } from '@react-spring/parallax';


export default (props) => {
  const styles = {
    main: {
    //backgroundColor: "#282c34",
    //minHeight: "100vh",
    // display: "flex",
    // flexDirection: "column",
    // alignItems: "center",
    justifyContent: "center",
    backgroundImage: `url(${Background})`,
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundAttachment: "fixed",
    position: "relative"
  }
    
  };
  const [newJobModal, setNewJobModal] =useState(false);
  const [jobs,setJobs]=useState([])
  const [loading, setLoading] = useState(true);
  const [viewJob, setViewJob] = useState({});
  const [openModal,setOpenModal]=useState(false)
  const jobCollection = collection(db,"Jobs");
  
  const fetchJobs = async() => {
    setLoading(true);
    const data = await getDocs(jobCollection);
    setJobs(data.docs.map((job) =>({...job.data(), id: job.id, postedOn: job.data().postedOn.toDate()})));
    setLoading(false);
  }
  useEffect(() =>{

    fetchJobs();
  },[])

  const postJob =async jobDetails => {
    await addDoc(jobCollection,{
      ...jobDetails, postedOn: serverTimestamp()
    });
    fetchJobs();
  }
  const fetchJobsCustom = async (jobSearch) => {
    setLoading(true);
    const q = query(jobCollection,where("location", '==', jobSearch.location),where("type", '==', jobSearch.type))
    const querySnapshot = await getDocs(q)
    const data = await getDocs(jobCollection);
    setJobs(querySnapshot.docs.map((job) =>({...job.data(), id: job.id, postedOn: job.data().postedOn.toDate()})));
    setLoading(false);
  }
  return (
    <div style={styles.main}>
      
      <ThemeProvider theme={theme} >
      <Header openJobModal={()=> setOpenModal(true)}/>
      <NewJobModal closeJobModal={()=> setOpenModal(false)} 
      openModal={openModal} 
      PostJob={postJob}/>
      <ViewJobModal job= {viewJob} closeModal={()=> setViewJob({})} />
      <Box >
      <Grid container justifyContent="center">
        <Grid item xs={10}>
          <SearchBar fetchJobsCustom={fetchJobsCustom}/>

            {
              loading?(
                <Box display="flex" justifyContent="center">
                <CircularProgress />
                </Box>
              ) 
              : jobs.map((job) =>(
                <JobCard open={()=>setViewJob(job)} key={job.id} {...job} />
              ))

            }
            

        </Grid>
      </Grid>
      </Box>

    </ThemeProvider>

    </div>
  );
};
