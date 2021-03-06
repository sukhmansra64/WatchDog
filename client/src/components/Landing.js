import {useHistory} from "react-router-dom";
import {useEffect} from "react";
import axios from "axios";


const Landing = () =>{
    const auth = localStorage.getItem('token')
    let history = useHistory()

    useEffect(()=>{
        console.log(auth);
        if(!auth){
            history.push('/login');
        }
        axios.get('/api/auth',{headers:{token: auth}})
            .then((data)=>{
                const response = data;
                console.log(response);
                history.push('/dashboard');
            }).catch((err)=>{
            console.error(err.response.data.msg)
            history.push('/login');
        });
    },[auth,history])
    return(
        <>

        </>
    )
};

export default Landing;