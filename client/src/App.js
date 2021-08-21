import {BrowserRouter, Route, Switch} from "react-router-dom";
import 'bootstrap';
import Landing from "./components/Landing";
import Login from "./components/Login";
import Register from "./components/Register";
import NavBar from "./components/NavBar";


function App() {
  return(
      <>
          <BrowserRouter>
              <NavBar/>
              <Switch>
                  <Route exact path='/'>
                      <Landing/>
                  </Route>
                  <Route exact path='/login'>
                      <Login/>
                  </Route>
                  <Route exact path='/register'>
                      <Register/>
                  </Route>
              </Switch>
          </BrowserRouter>
      </>
  );
}

export default App;
