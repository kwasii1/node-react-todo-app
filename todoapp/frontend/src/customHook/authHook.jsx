import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";


export function useAuth() {

    const [isAuth,setisAuth] = useState();
	const navigate = useNavigate();
    const [user,setUser] = useState({});
    useEffect(() => {
		try {
			axios.get('http://localhost:3000/api/auth',{withCredentials:true})
			.then((response) => {
				setisAuth(response.data.auth);
				setUser(response.data.user)
				if(response.data.auth === false){
					navigate('/login');
				}
			})
		} catch (error) {
			console.log(error);
		}
	},[isAuth,navigate])

    return {isAuth,user};
}