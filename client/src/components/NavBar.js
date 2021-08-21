import {Container, Nav, Navbar, NavLink} from "react-bootstrap";
import {Link} from "react-router-dom";



const NavBar = () =>{
    return(
        <Navbar bg="dark" variant="dark">
            <Container>
                <Link to='/' style={{textDecoration: 'none'}}>
                    <Navbar.Brand>WtchDg</Navbar.Brand>
                </Link>
                <Nav className="me-auto">
                    <NavLink as={Link} to='/login'>Login</NavLink>
                    <NavLink as={Link} to='/register'>Register</NavLink>
                    <NavLink as={Link} to='/'>Map</NavLink>
                </Nav>
            </Container>
        </Navbar>
    )
}

export default NavBar