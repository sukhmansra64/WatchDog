import {useEffect, useState} from "react";
import axios from "axios";
import {useHistory} from "react-router-dom";
import GoogleMapReact from 'google-map-react';
import style from '../styles/mapStyle';
import {Alert, Button, Form} from "react-bootstrap";
import markerPNG from './marker.png';

const Dashboard = () =>{
    const [form,setForm] = useState({});
    const [alert, setAlert] = useState("");
    const [isAlert, setIsAlert] = useState(false);
    const [isForm, setIsForm] = useState(false);
    const [marker, setMarker] = useState();
    const [visible, setVisible] = useState(false);
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
        setIsForm(false);
        axios.post('/api/markers',{text: form.value, lat: form.lat, lng: form.lng},{headers:{token: auth}})
            .then((response)=>{console.log(response)})
            .catch((err)=>{
                console.error(err.response.data.msg)
                setAlert(err.response.data.msg);
                setIsAlert(true);
            });
    }

    const changeStyle = () =>{
        if(visible )return {zIndex:2, height:100, width:90, visibility: 'visible'};
        if(!visible) return {zIndex:2, height:100, width:90, visibility: 'hidden'};
    }
    const onHover = (e) =>{
        setVisible(true);
    }

    const offHover = (e) =>{
        setVisible(false);
    }

    useEffect(()=>{
        if(!auth){
            history.push('/login');
        }
        axios.get('/api/auth',{headers:{token: auth}})
            .then((data)=>{
                const response = data;
            }).catch((err)=>{
            console.error(err.response.data.msg)
            history.push('/login');
        });
        axios.get('/api/markers',{headers:{token: auth}})
            .then((data)=>{
                const response = data;
                setMarker(response.data.markers);
                console.log(response.data.markers);
            }).catch((err)=>{
            console.error(err)
        });
    },[auth,history]);

    return(
        <>
            {isAlert &&<Alert variant='danger'>{alert}</Alert>}
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
                    {marker && marker.map((mark,key)=>
                        <img key={key} lat={mark.lat} lng={mark.lng} src={markerPNG} style={{height:50,width:50}}/>
                    )}
                    {marker && marker.map((mark,key)=>
                        <div onMouseEnter={onHover} onMouseLeave={offHover} lat={mark.lat} lng={mark.lng} style={{height:50,width: 50}} key={key}><div className='marker bg-white text-center rounded-2' key={key} style={changeStyle()}>
                            <p className='text-danger'>{mark.user.email}</p>
                            <p>{mark.text}</p>
                            <p className='text-primary'>{(mark.date).substr(0,10)}</p>
                        </div>
                        </div>

                    )}
                </GoogleMapReact>
            </div>
        </>
    )
};

export default Dashboard;