import { jwtDecode } from "jwt-decode";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import { AuthConstant } from "../constants/authConstant";

interface JwtPayload {
    exp: number;
  }

const ProtectedRoute = ({children}:{ children: React.ReactNode }) => {
    const navigate = useNavigate();
    const cookie = new Cookies();
    const access_token = cookie.get('access_token');
  
    useEffect(() => {
      if(access_token){
        const decodedToken = jwtDecode<JwtPayload>(access_token);

        const expiryTime = decodedToken.exp * 1000;

        const currentTime = new Date().getTime();

        if (currentTime > expiryTime) {
          navigate("/login")
        }
      }else {
        cookie.remove(AuthConstant.ACCESS_TOKEN);
        cookie.remove('fullName');
        cookie.remove('avatar');
      }
        
    }, [access_token]);
  
    return (
        <>{children}</>
    );
  };
  
  export default ProtectedRoute;