import axios from "axios";
import { useEffect, useState } from "react";

export function useCsrfToken() {
    const [csrfToken,setCsrfToken] = useState('');
    useEffect(() => {
        if (!csrfToken) {
            console.log("HEY FRONTEND");
            axios.get('http://localhost:3000/api/csrfToken',{withCredentials:true})
            .then((response) => {
                console.log(response.data.csrfToken);
                setCsrfToken(response.data.csrfToken);
            })
            .catch((error) => {
            console.log(error);
            })
        }
    },[csrfToken]);

    return csrfToken
}

