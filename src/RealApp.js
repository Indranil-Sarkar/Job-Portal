import { Container, Row, Col } from "react-bootstrap";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./component/ProtectedRoute";
import { UserAuthContextProvider } from "./context/UserAuthContext";
import App from "./App";
import Signin from "./Signin";
import SignUp from "./SignUp";
import Background from "./img/bg.jpg";
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
  }
};

function RealApp() {
  return (
    
          <UserAuthContextProvider>
            <Routes>
              <Route
                path="/home"
                element={
                  <ProtectedRoute>
                    
                    <App/>
                  </ProtectedRoute>
                }
              />
              
              <Route path="/" element={<Signin />} />
                
              <Route path="/signup" element={<SignUp />} />
            </Routes>
          </UserAuthContextProvider>
          
        
  );
}

export default RealApp;