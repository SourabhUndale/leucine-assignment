import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import RequestAccess from "./pages/RequestAccess";
import CreateSoftware from "./pages/CreateSoftware";
import PendingRequests from "./pages/PendingRequests";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { useAuth } from "./context/AuthContext";
// import Home from "./pages/Home";
import Navbar from "./components/Navbar";


function App() {
  const { user } = useAuth();

  const PrivateRoute = ({ children, allowed }) => {
    return user?.token && allowed.includes(user.role)
      ? children
      : <Navigate to="/" />;
  };

  return (
    <BrowserRouter>
    <Navbar />
      <Routes>
         
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Login />} />

       
        <Route path="/request-access" element={
          <PrivateRoute allowed={["Employee"]}><RequestAccess /></PrivateRoute>
        }/>
        <Route path="/create-software" element={
          <PrivateRoute allowed={["Admin"]}><CreateSoftware /></PrivateRoute>
        }/>
        {/* <Route path="/pending-requests" element={
          <PrivateRoute allowed={["Manager"]}>< /></PrivateRoute>
        }/> */}

        <Route path="/pending-requests" element={
          <PrivateRoute allowed={["Manager"]}><PendingRequests /></PrivateRoute>
        }/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
