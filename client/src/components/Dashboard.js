import {useEffect, useState} from "react";
import axios from "axios";
import {useHistory} from "react-router-dom";
import GoogleMapReact from 'google-map-react';
import style from '../styles/mapStyle';
import {Button, Form} from "react-bootstrap";

const Dashboard = () =>{
    const [form,setForm] = useState({});
    const [isForm, setIsForm] = useState(false);
    const [marker, setMarker] = useState([]);
    const auth = localStorage.getItem('token');
    let history = useHistory();
    const options = {
        styles : style,
        disableDefaultUI: true
    }

     const placeMarker = (e) => {
        setForm({
            lat: e.lat,
            lng: e.lng,
            value: ''
        });
        setIsForm(true);
    }
    const formOnChange = (e) =>{
        setForm({
            ...form,
            value: e.target.value
        });
    }
    const submitOnclick = (e) =>{
        e.preventDefault();
        setIsForm(false);
        console.log(form.value);
    }

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
                    options={options}
                    onClick={placeMarker}
                >
                    {isForm && <div className='bg-white rounded rounded-3 text-center justify-content-center'  style={{height: 40, width:200, borderTopLeftRadius:0}} lat={form.lat} lng={form.lng} >
                        <Form>
                            <Form.Group size="lg" controlId="formText">
                        <Form.Label>What Happened?</Form.Label>
                        <Form.Control
                            type="text"
                            onChange={formOnChange}
                            value={form.value}
                            autoFocus
                        />
                    </Form.Group>
                        <Button block size="lg" type="submit" className='btn-dark' onClick={submitOnclick}>
                            Submit
                        </Button>
                    </Form>
                    </div>}
                </GoogleMapReact>
            </div>
        </>
    )
}

export default Dashboard;