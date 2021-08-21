import {Alert,Form, Button} from "react-bootstrap";
import '../styles/loginStyle.css';
import {Link} from "react-router-dom";
import {useState} from "react";
import {useHistory} from 'react-router-dom';
import axios from "axios";


const Login = () =>{
    const [email,setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [alert, setAlert] = useState("");
    const [isAlert, setIsAlert] = useState(false);
    let history = useHistory();

    const postRequest = () =>{
        axios.post('/api/auth',{email,password})
            .then((data)=>{
                localStorage.setItem('token',data.data.token);
                history.push('/dashboard');
            }).catch((err)=>{
            console.error(err)
            setAlert(err.response.data.errors[0].msg);
            setIsAlert(true);
        });
    }

    const submit = (e) =>{
        e.preventDefault();
        setIsAlert(false);
        postRequest();
    }
    return(
           <>
               {isAlert &&<Alert variant='danger'>{alert}</Alert>}
               <div className="Login">
                   <Form>
                       <Form.Group size="lg" controlId="email">
                           <Form.Label>Email</Form.Label>
                           <Form.Control
                               autoFocus
                               type="email"
                               onChange={(e)=>{setEmail(e.target.value)}}
                           />
                       </Form.Group>
                       <Form.Group size="lg" controlId="password" className='password'>
                           <Form.Label>Password</Form.Label>
                           <Form.Control
                               type="password"
                               onChange={(e)=>{setPassword(e.target.value)}}
                           />
                       </Form.Group>
                       <Link to='/register' className='text-black'>
                           <p>Don't have an account?</p>
                       </Link>
                       <Button block size="lg" type="submit" className='btn-dark' onClick={submit}>
                           Login
                       </Button>
                   </Form>
               </div>
           </>
    )
}

export default Login;