import {Form, Button} from "react-bootstrap";
import '../styles/loginStyle.css';
import {Link} from "react-router-dom";


const Login = () =>{
    return(
           <>
               <div className="Login">
                   <Form>
                       <Form.Group size="lg" controlId="email">
                           <Form.Label>Email</Form.Label>
                           <Form.Control
                               autoFocus
                               type="email"
                           />
                       </Form.Group>
                       <Form.Group size="lg" controlId="password" className='password'>
                           <Form.Label>Password</Form.Label>
                           <Form.Control
                               type="password"
                           />
                       </Form.Group>
                       <Link to='/register' className='text-black'>
                           <p>Don't have an account?</p>
                       </Link>
                       <Button block size="lg" type="submit" className='btn-dark'>
                           Login
                       </Button>
                   </Form>
               </div>
           </>
    )
}

export default Login;