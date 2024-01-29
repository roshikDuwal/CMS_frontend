import { createContext, useEffect, useState } from "react"
import { authorizationAxiosInstance } from "../axios/Axios";


interface AuthContextProps {
    userDetail: any;
    setUserDetail: React.Dispatch<React.SetStateAction<any>>;
    LogoutUser: () => void;
    isLoading:boolean;
}

export const AuthContext = createContext<AuthContextProps>({
    userDetail: {},
    setUserDetail: () => { },
    LogoutUser: () => { },
    isLoading:false,
});



export const AuthProvider = ({ children }: { children: any }) => {
    const [userDetail, setUserDetail] = useState<any>({});
    const [isLoading,setIsLoading]=useState<boolean>(true);
  

    const LogoutUser = () => {
        return localStorage.clear();
    }

    const AuthorizationData = async () => {
        setIsLoading(true);
        try {
            const res = await authorizationAxiosInstance.get("/user")
            setUserDetail(res.data.user);
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        AuthorizationData()
    }, [])



    return <AuthContext.Provider value={{ userDetail, setUserDetail, LogoutUser,isLoading}}>
        {children}
    </AuthContext.Provider>
}


