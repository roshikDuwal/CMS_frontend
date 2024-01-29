import { AxiosResponse } from "axios";
import { useMutation } from "react-query";
import { LoginFormData } from "../Login";
import { AxiosInstance } from "../../../axios/Axios";
import { toast } from "react-toastify";
import { useContext } from "react";
import { AuthContext } from "../../../context/authContext";
import { useNavigate } from "react-router-dom";

export const postLogin = () => {

  const navigate=useNavigate();

  const {setUserDetail}=useContext(AuthContext);

  async function login(data: LoginFormData) {
    const res = await AxiosInstance.post("/login", data);
    return res;
  }

  const postLoginMutation = useMutation<
    AxiosResponse<any>,
    unknown,
    LoginFormData
  >({
    mutationFn: async (request) => await login(request),
    onSuccess: async (response) => {
      localStorage.setItem("access_token",response.data.access_token);
      localStorage.setItem("refresh_token",response.data.refresh_token);
      setUserDetail(response.data.user);
      toast.success(response.data.message);
      navigate("/");
    },
    onError: async (error:any) => {
     toast.error(error.response.data.message)
    },
  });

  return {
    postLoginMutation,
  };
};
