import {useEffect, useState} from "react";
import axios from "axios";
import {useHistory} from "react-router-dom";
import GoogleMapReact from 'google-map-react';

const Dashboard = () =>{
    const auth = localStorage.getItem('token');
    let history = useHistory();

    useEffect(()=>{
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
    },[auth,history]);

    return(
        <>
            <div style={{ height: '100vh', width: '100%' }}>
                <GoogleMapReact
                    bootstrapURLKeys={{ key: "AIzaSyCbYVvMQ10-t31PWAWSkUTG07XPPw-SSV0" }}
                    defaultCenter={{
                        lat:43.6548,
                        lng:-79.3883
                    }}
                    defaultZoom={15}
                >
                </GoogleMapReact>
            </div>
        </>
    )
}

export default Dashboard