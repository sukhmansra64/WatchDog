import '../styles/registerStyle.css'
import {Alert, Button, Form} from "react-bootstrap";
import {Link} from "react-router-dom";
import {useState} from "react";
import axios from "axios";

const Register = () =>{
    const [email,setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [alert, setAlert] = useState("");
    const [isAlert, setIsAlert] = useState(false);
    const [response,setResponse] = useState();


    const postRequest = () =>{
        axios.post('/api/users',{email,password})
            .then((data)=>{
                setResponse(data.data.token);
                console.log(response);
            }).catch((err)=>{
                setAlert(err.response.data.errors[0].msg);
                setIsAlert(true);
            });
    }

    const submit = (e) =>{
        e.preventDefault();
        if(password!==password2){
            setAlert("Passwords do not match");
            setIsAlert(true);
        }else{
            setIsAlert(false);
            postRequest();
        }
    }
    return(
        <>
            {isAlert &&<Alert variant='danger'>{alert}</Alert>}
            <div className="Register">
                <Form>
                    <Form.Group size="lg" controlId="email">
                        <Form.Label>Email:</Form.Label>
                        <Form.Control
                            autoFocus
                            type="email"
                            onChange={(e)=>{setEmail(e.target.value)}}
                        />
                    </Form.Group>
                    <Form.Group size="lg" controlId="password" className='password'>
                        <Form.Label>Password:</Form.Label>
                        <Form.Control
                            type="password"
                            onChange={(e)=>{setPassword(e.target.value)}}
                        />
                    </Form.Group>
                    <Form.Group size="lg" controlId="repassword" className='password'>
                        <Form.Label>Re-Type Password:</Form.Label>
                        <Form.Control
                            type="password"
                            onChange={(e)=>{setPassword2(e.target.value)}}
                        />
                    </Form.Group>
                    <Link to='/login' className='text-black'>
                        <p>Already have an account?</p>
                    </Link>
                    <Button block size="lg" type="submit" className='btn-dark' onClick={submit}>
                        Register
                    </Button>
                </Form>
            </div>
        </>
    )
}

export default Register;