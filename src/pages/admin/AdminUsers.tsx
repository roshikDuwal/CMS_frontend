import { Button, Heading, useDisclosure } from "@chakra-ui/react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { authorizationAxiosInstance } from "../../axios/Axios";
import DeleteModal from "../../components/ui/admin/user/DeleteModal";
import React, { useState } from "react";
import { toast } from "react-toastify";
import EditModal from "../../components/ui/admin/user/EditModal";
import { SubmitHandler, useForm } from "react-hook-form";
import { AxiosResponse } from "axios";

export interface AdminUserElemProps {
  email: string;
  isAdmin: boolean | string;
  phone: string;
  username: string;
  _id: string;
  password: string;
  confirmPassword: string;
}

const AdminUsers = () => {
  const [selectedUserId, setSelectedUserId] = useState<string>("");

  const { isOpen: isDeleteOpen, onOpen: onDeleteOpen, onClose: onDeleteClose } = useDisclosure();
  const { isOpen: isEditOpen, onOpen: onEditOpen, onClose: onEditClose } = useDisclosure();

  const queryClient = useQueryClient();

  const {
    handleSubmit,
    control,
    register,
    watch,
    formState: {
      errors
    },
    setValue,
  } = useForm<AdminUserElemProps>();


  //Get All User
  async function getAllUserData() {
    const res = await authorizationAxiosInstance.get("/admin/users");
    return res;
  }
  const data = useQuery("getalluserdata", getAllUserData)


  //Delete User
  const deleteUser = useMutation((id: string) => {
    return authorizationAxiosInstance.delete(`/admin/users/${id}`);
  }, {
    onSuccess: (response) => {
      toast.success(response.data.message)
      onDeleteClose();
      queryClient.invalidateQueries({ queryKey: ["getalluserdata"] });
    },
    onError: (error: any) => {
      toast.error(error.response.data.message)
    }
  });

  //Edit User
  const editUserMutation = useMutation<AxiosResponse<any, any>, any, AdminUserElemProps, unknown>((updatedData: AdminUserElemProps) =>
    authorizationAxiosInstance.patch(`/admin/users/update/${selectedUserId}`, updatedData),
    {
      onSuccess: (response) => {
        toast.success(response.data.message);
        onEditClose();
        queryClient.invalidateQueries({ queryKey: ["getalluserdata"] });
      },
      onError: (error: any) => {
        toast.error(error.response.data.message);
      },
    }
  );

  const editUser: SubmitHandler<AdminUserElemProps> = async (data) => {
    editUserMutation.mutate(data);
  };

  return (
    <>
      <section className="w-full overflow-auto flex flex-col gap-6  h-screen">
        <div className=" w-full text-center">
          <Heading>Admin Users Data</Heading>
        </div>

        <div className=" container ">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Admin</th>
                <th>Update</th>
                <th>Delete</th>
              </tr>
            </thead>

            <tbody>
              {
                data?.data?.data?.users && data?.data?.data?.users.map((elem: AdminUserElemProps) => {

                  return (
                    <React.Fragment key={elem._id}>
                      <tr className="text-center">
                        <td>{elem.username}</td>
                        <td>{elem.email}</td>
                        <td>{elem.phone}</td>
                        <td>{elem.isAdmin ? "Admin" : "User"}</td>
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

        <EditModal isEditOpen={isEditOpen} onEditClose={onEditClose} id={selectedUserId} editUser={editUser} setSelectedUserId={setSelectedUserId} handleSubmit={handleSubmit} register={register} errors={errors} watch={watch} control={control} setValue={setValue}  />


        <DeleteModal isDeleteOpen={isDeleteOpen} onDeleteClose={onDeleteClose} id={selectedUserId} setSelectedUserId={setSelectedUserId} deleteUser={deleteUser} />
      </section>
    </>
  )
}

export default AdminUsers