import {useEffect} from "react";
import axios from "axios";
import {useHistory} from "react-router-dom";

const Dashboard = () =>{
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
            }).catch((err)=>{
            console.error(err.response.data.msg)
            history.push('/login');
        });
    },[auth,history])
    return(
        <>
            <h1>Logged in</h1>
        </>
    )
}

export default Dashboard