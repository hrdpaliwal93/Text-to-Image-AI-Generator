import { createContext, useEffect, useState } from "react";
import axios from 'axios'
import { useNavigate } from "react-router-dom";

export const AppContext  =createContext();


const AppContextProvider = (props)=>{
    const [user, setuser] = useState(null)
    const [showlogin, setshowlogin] = useState(false)
    const [token , settoken] = useState(localStorage.getItem('token'))
    const [credit, setcredit] = useState(false)

    const navigate = useNavigate()
    const backendurl = import.meta.env.VITE_BACKGROUND_URL

   const loadcreditdata = async () => {
    const token = localStorage.getItem('token')
    const { data } = await axios.get(backendurl + '/api/user/credits', {
        headers: { token }
    });

    if (data.success) {
        setcredit(data.credits);
        setuser(data.user);
    }else{
        setcredit(0);
        setuser(data.user);
    }
}

const generateimage = async (prompt) => {
    const token = localStorage.getItem('token')
    const { data } = await axios.post(
        'http://localhost:3000' + '/api/image/generate-image',
        { prompt },
        { headers: { token } }
    );

    console.log(data);

    if (data.success) {
       
        loadcreditdata();
        
        return data.image;
    }
    else{
        
           navigate('/buy')
       
    }
}



    const logout = ()=>{
        localStorage.removeItem('token')
        settoken('')
        setuser(null)

    }

    useEffect(()=>{
    if(token){
        loadcreditdata()
    }
    }, [token])
    const value  = {
        user,setuser, showlogin, setshowlogin, backendurl, token , settoken, credit, setcredit, loadcreditdata, logout, generateimage
    }
    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )

}
export default AppContextProvider