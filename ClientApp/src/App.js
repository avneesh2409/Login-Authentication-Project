import React, { useState, useEffect } from 'react';
import { Route, Redirect } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import './custom.css';
// import Index from './components/Index';
import Logout from './components/child/Logout';
//import SmsService from './components/SendSmsService';
import RegistrationForm from './components/child/RegisterComponent';
import LoginForm from './components/child/LoginComponent';
import { LOGOUT, HOME, REGISTER, LOGIN } from './constants';
import Zoomcomponent from './components/ZoomComponent';
import Redirectroute from './components/RedirectRoute';

const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    useEffect(() => {
        if (localStorage.getItem('token')) {
            setIsLoggedIn(true)
        }
    },[])
    return (
        <Layout isLoggedIn={isLoggedIn}>
            {
                (!isLoggedIn) ?
                    <>
                        <Route exact path={`${REGISTER}`} component={RegistrationForm} />
                        <Route exact path={`${LOGIN}`} render={(props) => <LoginForm {...props} setIsLoggedIn={setIsLoggedIn} />} />
                        <Route path="/redirect" component={Redirectroute} />
                        <Route path="/zoom" component={Zoomcomponent} />
                        {/* <Route path="*" render={() => <Redirect to={`${LOGIN}`} />} /> */}

                    </>
                        :
                    <>
                        <Route exact path={`${LOGOUT}`} render={(props) => <Logout {...props} setIsLoggedIn={setIsLoggedIn} />} />
                        <Route exact path={`${HOME}`} component={Home} />
                        <Route path="*" render={() => <Redirect to={`${HOME}`} />} />
                    </>
            }
            
      </Layout>
    );
}
export default App;