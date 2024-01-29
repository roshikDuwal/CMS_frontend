import { useContext, useEffect } from "react"
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";

 const Logout=()=>{
    
    const {LogoutUser}=useContext(AuthContext);

    useEffect(()=>{
        LogoutUser();
    },[LogoutUser]);

    return <Navigate to={"/login"}/>
}

export default Logout