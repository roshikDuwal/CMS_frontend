import { NavLink, Navigate, Outlet } from "react-router-dom"
import { FaUsers } from "react-icons/fa";
import { IoIosContacts } from "react-icons/io";
import { MdMiscellaneousServices } from "react-icons/md";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";

const AdminLayout = () => {

    const { userDetail, isLoading } = useContext(AuthContext)

    if (isLoading) {
        return <>Loading...</>
    }

    if (!userDetail.isAdmin) {
        return <Navigate to={"/"} />;
    }

    return (
        <>
            <div className="flex gap-2 ">
                <header className="w-1/3 sm:w-2/5 lg:w-1/5 text-gray-600 body-font">
                    <div className=" flex flex-col  p-5 pt-20 items-center shadow-xl h-[100vh]   gap-10">
                        <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">

                            <span className="ml-3 text-xl">ADMIN PANEL</span>
                        </a>

                    
                            <NavLink to={"/logout"} className="inline-flex items-center bg-gray-100 border-0 py-2 px-4 focus:outline-none hover:bg-gray-200 rounded text-base 0">
                                Logout
                            </NavLink>
                

                        <nav className="flex flex-col  items-start text-base gap-5 justify-center">
                            <NavLink to={"/admin/users"} className=" flex  items-center gap-2 mr-5 hover:text-gray-900"> <FaUsers />Users</NavLink>
                            <NavLink to={"/admin/contacts"} className=" flex  items-center gap-2 mr-5 hover:text-gray-900"><IoIosContacts /> Contacts</NavLink>
                            <NavLink to={"/admin/services"} className="mr-5 hover:text-gray-900 flex  items-center gap-2"><MdMiscellaneousServices /> Services</NavLink>
                        </nav>
                    </div>
                </header>

                <Outlet />
            </div>

        </>
    )
}

export default AdminLayout