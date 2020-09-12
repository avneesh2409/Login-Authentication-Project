import React, { useState } from 'react';
import { Route, Redirect } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import './custom.css';
import Index from './components/Index';
import Logout from './components/child/Logout';
import SmsService from './components/SendSmsService';
import RegistrationForm from './components/child/RegisterComponent';
import LoginForm from './components/child/LoginComponent';

const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    return (
        <Layout isLoggedIn={isLoggedIn}>
            {
                (!isLoggedIn) ?
                    <>
                        <Route exact path="/" component={Index} />
                        <Route exact path="/register" component={RegistrationForm} />
                        <Route exact path="/login" render={(props) => <LoginForm {...props} setIsLoggedIn={setIsLoggedIn} />} />
                    </>
                        :
                    <>
                        <Route exact path='/logout' render={(props) => <Logout {...props} setIsLoggedIn={setIsLoggedIn} />} />
                        <Route exact path='/home' component={Home} />
                        <Route exact path="/sendsms" component={SmsService} />
                    </>
            }
            
      </Layout>
    );
}
export default App;