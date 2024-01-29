import { NavLink } from "react-router-dom"
import { Auth } from "../../../utils/auth";
import { useContext } from "react";
import { AuthContext } from "../../../context/authContext";


const Navbar = () => {

    const {userDetail}=useContext(AuthContext)
    const { isAuthenticated } = Auth();
    
    return (
        <header className="text-gray-600 body-font">
            <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
                <NavLink to={""} className="flex order-first lg:order-none lg:w-1/5 title-font font-medium items-center text-gray-900 lg:items-center lg:justify-center mb-4 md:mb-0">

                    <span className="ml-3 text-xl">MERN Stack</span>
                </NavLink>

                <nav className="flex lg:w-2/5 flex-wrap items-center text-base md:ml-auto">
                    <NavLink to={"/"} className="mr-5 hover:text-gray-900">Home</NavLink>
                    <NavLink to={"/about"} className="mr-5 hover:text-gray-900">About Us</NavLink>
                    <NavLink to={"/service"} className="mr-5 hover:text-gray-900">Service</NavLink>
                    <NavLink to={"/contact"} className="mr-5 hover:text-gray-900">Contact Us</NavLink>

                </nav>

                <div className="lg:w-2/5 inline-flex lg:justify-end ml-5 lg:ml-0 items-center gap-2">
                {
                    isAuthenticated()?(
                        <h1>Welcome {userDetail.username}</h1>
                    ):null
                }
                    {
                        isAuthenticated()  ? (
                            <NavLink to={"/logout"} className="inline-flex items-center bg-gray-100 border-0 py-2 px-4 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0">
                                Logout
                            </NavLink>
                        ) : (
                            <NavLink to={"/login"} className="inline-flex items-center bg-gray-100 border-0 py-2 px-4 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0">
                                Login
                            </NavLink>
                        )
                    }



                </div>
            </div>
        </header>

    )
}

export default Navbar