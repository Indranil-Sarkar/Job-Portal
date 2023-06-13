import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Alert } from "react-bootstrap";
import Background from "./img/bg.jpg";
import LockIcon from "@material-ui/icons/LockOutlined";
import { useUserAuth } from "./context/UserAuthContext";
import {  Avatar,
  Button,
  CssBaseline,
  FormControl,
  Input,
  InputLabel,
  Paper,
  CircularProgress, Typography, makeStyles} from "@material-ui/core";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [password, setPassword] = useState("");
  const { signUp } = useUserAuth();
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await signUp(email, password);
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

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
         Sign Up
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
          Register
          
        </Button>

        <div style={{ textAlign: "center" }}>
          <Typography
            variant="subtitle1"
            style={{ marginTop: 20 }}
            gutterBottom
          >
            Already have an account?{" "}
            <Link style={{ textDecoration: "none" }} to="/">
              Login Now!
            </Link>
          </Typography>
        </div>
      </form>
    </Paper>

    
  </div>
  );
};

export default SignUp;