import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Alert } from "react-bootstrap";
import LockIcon from "@material-ui/icons/LockOutlined";
import GoogleButton from "react-google-button";
import { useUserAuth } from "./context/UserAuthContext";
import Background from "./img/bg.jpg";
import {  Avatar,
  Button,
  CssBaseline,
  FormControl,
  Input,
  InputLabel,
  Paper,
  CircularProgress, Typography, makeStyles} from "@material-ui/core";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { logIn, googleSignIn } = useUserAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await logIn(email, password);
      navigate("/home");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogleSignIn = async (e) => {
    e.preventDefault();
    try {
      await googleSignIn();
      navigate("/home");
    } catch (error) {
      console.log(error.message);
    }
  };
  const useStyles = makeStyles({
    wrapper: {
        backgroundColor: "#F5F5DC",
        display: "flex",
        boxShadow: "0px 1px 5px rgba(0, 0, 0, 0.1)",
        borderRadius: "5px",
        "& > *": {
            flex: 1,
            height: "45px",
            margin: "8px",
        }
    }
})
const styles = {
  main: {
    backgroundColor: "#282c34",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundImage: `linear-gradient(rgba(63, 81, 181, 0.7), rgba(63, 81, 181, 0.7)), url(${Background})`,
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    position: "relative"
  },
  paper: {
    marginTop: 24,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "48px 48px 48px"
  },
  avatar: {
    margin: 8,
    backgroundColor: "orange"
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: 8
  },
  submit: {
    marginTop: 24
  },
  submitLoader: {
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12
  }
};

  return (
    <div style={styles.main}>
    <CssBaseline />
    <Paper style={styles.paper} elevation={24}>
      <Avatar style={styles.avatar}>
        <LockIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
         Sign in
      </Typography>

      <form style={styles.form}>
        <FormControl margin="normal" required fullWidth>
          <InputLabel htmlFor="email">Email Address</InputLabel>
          <Input
            type="email"
            id="email"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormControl>

        <FormControl margin="normal" required fullWidth>
          <InputLabel htmlFor="password">Password</InputLabel>
          <Input
            
            name="password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormControl>

        <Button
          fullWidth
          variant="contained"
          color="primary"
          style={styles.submit}
          onClick={handleSubmit}
          
        >
          Sign in
          
        </Button>

        <div style={{ textAlign: "center" }}>
          <Typography
            variant="subtitle1"
            style={{ marginTop: 20 }}
            gutterBottom
          >
            Don't have an account ?{" "}
            <Link style={{ textDecoration: "none" }} to="/signup">
              Register Now!
            </Link>
          </Typography>
        </div>
      </form>
    </Paper>

    
  </div>
  );
};

export default Signin;