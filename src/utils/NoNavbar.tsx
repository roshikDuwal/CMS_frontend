import { ReactNode } from "react";
import { useLocation } from "react-router-dom";

interface NoNavbarProps {
    children: ReactNode
}

const NoNavbar = ({ children }: NoNavbarProps) => {
    const location = useLocation();
    const pathsWithoutNavbar = ["/login","/register","/admin","/admin/users","/admin/contacts","/admin/","/admin/services"
    ];
    const showNavbar = !pathsWithoutNavbar.includes(location.pathname);

    return <div>{showNavbar && children}</div>;
};

export default NoNavbar;