import { Button, Heading, useDisclosure } from "@chakra-ui/react";
import { AxiosResponse } from "axios";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { authorizationAxiosInstance } from "../../axios/Axios";
import AddModal from "../../components/ui/admin/service/AddModal";
import DeleteModal from "../../components/ui/admin/user/DeleteModal";
import ServiceEditModal from "../../components/ui/admin/service/ServiceEditModal";

export interface AdminServiceElemProps {
  service: string;
  description: string;
  price: number;
  provider: string;
  _id: string,
}

const AdminService = () => {
  const [selectedUserId, setSelectedUserId] = useState<string>("");

  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isEditOpen, onOpen: onEditOpen, onClose: onEditClose } = useDisclosure();
  const { isOpen: isDeleteOpen, onOpen: onDeleteOpen, onClose: onDeleteClose } = useDisclosure();

  const queryClient = useQueryClient();

  const {
    handleSubmit,
    control,
    register,
    formState: {
      errors
    },
    watch,
    setValue
  } = useForm<AdminServiceElemProps>();

  //Get All Service Data
  async function getAllServiceData() {
    const res = await authorizationAxiosInstance.get("/admin/service");
    return res;
  }
  const data = useQuery("getallservicedata", getAllServiceData)


  //Add Service
  const addServiceMutation = useMutation<AxiosResponse<any, any>, any, AdminServiceElemProps, unknown>((addData: AdminServiceElemProps) =>
    authorizationAxiosInstance.post(`/admin/add/service/`, addData),
    {
      onSuccess: (response) => {
        toast.success(response.data.message);
        onClose();
        queryClient.invalidateQueries({ queryKey: ["getallservicedata"] });
      },
      onError: (error: any) => {
        toast.error(error.response.data.message);
      },
    }
  );

  const addUser: SubmitHandler<AdminServiceElemProps> = async (data) => {
    addServiceMutation.mutate(data);
  };

  const {isLoading}=addServiceMutation;


    //Edit User
    const editServiceMutation = useMutation<AxiosResponse<any, any>, any, AdminServiceElemProps, unknown>((updatedData: AdminServiceElemProps) =>
    authorizationAxiosInstance.patch(`/admin/service/edit/${selectedUserId}`, updatedData),
    {
      onSuccess: (response) => {
        toast.success(response.data.message);
        onEditClose();
        queryClient.invalidateQueries({ queryKey: ["getallservicedata"] });
      },
      onError: (error: any) => {
        toast.error(error.response.data.message);
      },
    }
  );

  const editUser: SubmitHandler<AdminServiceElemProps> = async (data) => {
    editServiceMutation.mutate(data);
  };

  const {isLoading:isEditLoading}=editServiceMutation;

  //Delete contact
  const deleteUser = useMutation((id: string) => {
    return authorizationAxiosInstance.delete(`/admin/services/${id}`);
  }, {
    onSuccess: (response) => {
      toast.success(response.data.message)
      onDeleteClose();
      queryClient.invalidateQueries({ queryKey: ["getallservicedata"] });
    },
    onError: (error: any) => {
      toast.error(error.response.data.message)
    }
  });

  return (
    <>
      <section className="w-full overflow-auto flex flex-col gap-6  h-screen ">
        <div className=" w-full text-center ml-auto flex justify-around items-center p-2">
          <Heading>Admin Service Data</Heading>
          <Button onClick={onOpen}>Add Service</Button>
        </div>

        <div className=" container h-full overflow-auto ">
          <table>
            <thead>
              <tr>
                <th>Service</th>
                <th>Description</th>
                <th>Price</th>
                <th>Provider</th>
                <th>Update</th>
                <th>Delete</th>
              </tr>
            </thead>

            <tbody>
              {
                data?.data?.data?.data && data?.data?.data?.data.map((elem: AdminServiceElemProps) => {
                  return (
                    <React.Fragment key={elem._id}>
                      <tr className="text-center">
                        <td>{elem.service}</td>
                        <td>{elem.description}</td>
                        <td>Rs{elem.price}</td>
                        <td>{elem.provider}</td>
                        <td><Button onClick={() => { setSelectedUserId(elem._id); onEditOpen() }}>Edit</Button></td>
                        <td>  <Button onClick={() => { setSelectedUserId(elem._id); onDeleteOpen() }}>Delete</Button></td>
                      </tr>
                    </React.Fragment>
                  )
                })
              }
            </tbody>

          </table>
        </div>

        <AddModal handleSubmit={handleSubmit} register={register} isOpen={isOpen} onClose={onClose} errors={errors} control={control} addUser={addUser} isLoading={isLoading} />

        <ServiceEditModal isEditOpen={isEditOpen} onEditClose={onEditClose} id={selectedUserId} editUser={editUser} setSelectedUserId={setSelectedUserId} handleSubmit={handleSubmit} register={register} errors={errors} watch={watch} control={control} setValue={setValue}  isEditLoading={isEditLoading} />

        <DeleteModal isDeleteOpen={isDeleteOpen} onDeleteClose={onDeleteClose} id={selectedUserId} setSelectedUserId={setSelectedUserId} deleteUser={deleteUser} />
      </section>
    </>
  )
}

export default AdminService