import { ReactNode, } from "react";
import { Navigate, useNavigate } from "react-router";
import { useFullUser } from "../redux/hooks/useUserByEmail";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
    const user = useFullUser();
    const navigate = useNavigate();
    console.log(user);
    if (user?.isLoading) {
        return 
    }

    if (!user?.user) {
        return <Navigate to="/auth/login" replace={true} />;
    }
    console.log(window.location.pathname);

    if (user?.user?.UserType === "user" && window.location.pathname.startsWith("/dashboard/admin")) {
        return navigate('/dashboard/user');
    }

    if (user?.user?.UserType === "admin" && window.location.pathname.startsWith("/dashboard/user")) {
        return navigate('/dashboard/admin');
    }

    return children;
};

export default ProtectedRoute;