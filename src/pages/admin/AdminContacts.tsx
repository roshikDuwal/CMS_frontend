import { Heading } from "@chakra-ui/react";
import { useQuery } from "react-query";
import { authorizationAxiosInstance } from "../../axios/Axios";

interface AdminContactElemProps {
    email: string;
    message: string;
    phone: string;
    username: string;
    _id: string;
}

const AdminContacts = () => {

    //get contact detail
    async function getAllContactData() {
        const res = await authorizationAxiosInstance.get("/admin/contacts");
        return res;
    }

    const data = useQuery("getallcontactdata", getAllContactData)

    return (
        <>
            <section className="w-full overflow-auto flex flex-col gap-6  h-screen ">
                <div className=" w-full text-center">
                    <Heading>Admin Contact Data</Heading>
                </div>

                <div >
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Message</th>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                data?.data?.data?.contacts && data?.data?.data?.contacts.map((elem: AdminContactElemProps) => {
                                    return (
                                        <tr key={elem._id} className="text-center">
                                            <td>{elem.username}</td>
                                            <td>{elem.email}</td>
                                            <td>{elem.phone}</td>
                                            <td>{elem.message}</td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>

            </section>

            
        </>
    )
}

export default AdminContacts