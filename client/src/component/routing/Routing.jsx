import {
    BrowserRouter as Router,
    Route,
    Routes,
    Link
} from "react-router-dom";


import Login from "../Login/Login"
import Edit from "../edit/Edit"
import Profile from "../profile/Profile"
import Signin from "../signin/Signin";
import GoogleAuth from "../googleauth/googleauth";

const Routing = ({theme}) => {


    return (
        <>
        <Routes>
          <Route exact path="/" element={<Signin theme={theme}/>}/>
          <Route exact path="/login" element={<Login theme={theme}/>}/>
          <Route path="/edit" element={<Edit theme={theme}/>}/>
          <Route path="/profile" element={<Profile theme={theme}/>}/>
          <Route path="/google" element={<GoogleAuth />}/>
        </Routes>
        </>
    )
}

export default Routing