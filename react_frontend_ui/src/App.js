import Contact from "./pages/Contact";
import Home from "./pages/Home";
import Layout from "./pages/Layout";
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import LoginReg from "./pages/auth/LoginReg";
import SendPasswordResetEmail from "./pages/auth/SendPasswordResetEmail";
import ResetPassword from "./pages/auth/ResetPassword";
import Dashboard from "./pages/Dashboard";
import ChangePassword from "./pages/auth/ChangePassword";
import { useSelector } from "react-redux";
function App() {

  const {access_token} = useSelector(state => state.auth)
  return (
    <>
    {/* <Layout/> */}
    <BrowserRouter>
    <Routes>
      <Route path="/" element = {<Layout/>}>
        <Route index element={<Home/>}/>
        <Route  path = "contact" element={<Contact/>}/>
        <Route  path = "login" element={ !access_token ? <LoginReg/> : <Navigate to="/dashboard"/> }/>
        <Route  path = "sendpasswordresetemail" element={<SendPasswordResetEmail/>}/>
        <Route  path = "api/reset_password/:id/:token" element={<ResetPassword/>}/>
      </Route>

        {/* <Route  path = "/changepassword" element={<ChangePassword/>}/> */}
        <Route  path = "/dashboard" element={ access_token ? <Dashboard/> : <Navigate to="/login"/>  }/>
        <Route  path = "*" element={ <h2>Error 404 ....Page not found !!!</h2> }/>

    </Routes>
    </BrowserRouter>
    
    </>
  );
}

export default App;
