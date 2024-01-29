import { useMutation } from "react-query";
import { AxiosInstance } from "../../../axios/Axios";
import { RegisterFormData } from "../Register";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AxiosResponse } from "axios";

export const postRegister = () => {
  const navigate = useNavigate();

  async function register(data: RegisterFormData) {
    const res = await AxiosInstance.post("/register", data);
    return res;
  }

  const postRegisterMutation = useMutation<
    AxiosResponse<any>,
    unknown,
    RegisterFormData
  >({
    mutationFn: async (request) => await register(request),
    onSuccess: async (response) => {
      navigate("/login");
      toast.success(response.data.message);
    },
    onError: async (error:any) => {   
      toast.error(error.response.data.message);
    },
  });

  return {
    postRegisterMutation,
  };
};

export default postRegister;
