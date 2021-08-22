import {Button, Container, Nav, Navbar, NavLink} from "react-bootstrap";
import {Link, useHistory} from "react-router-dom";
import logo from './watch-dog-logo.png';



const NavBar = () =>{
    let history = useHistory();
    const token = localStorage.getItem('token');
    const handleClick = () =>{
        if(token){
            localStorage.removeItem('token');
            history.push('/login');
        }else{
            history.push('/login');
        }

    }

    return(
        <Navbar bg="dark" variant="dark">
            <Container>
                <Link to='/' style={{textDecoration: 'none'}}>
                    <Navbar.Brand><img src={logo} className="d-inline-block align-top" width={100} height={50}/></Navbar.Brand>
                </Link>
                <Nav className="me-auto">
                    <NavLink as={Link} to='/login'>Login</NavLink>
                    <NavLink as={Link} to='/register'>Register</NavLink>
                    <NavLink as={Link} to='/'>Map</NavLink>
                </Nav>
                <Nav><Button onClick={handleClick} className='btn-light'>Sign Out</Button></Nav>
            </Container>
        </Navbar>
    )
};

export default NavBar