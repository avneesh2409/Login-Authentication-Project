import React, { useState } from 'react'
import Facebook from './FacebookLogin';
import Google from './GoogleLogin';
//import { Home } from '../Home';
import {
    Container, Col, Form,
    FormGroup, Label, Input,
    Button,
} from 'reactstrap';

const LoginForm = ({ history,setIsLoggedIn }) => {
    const initial = {
        email: "",
        password: ""
    }
    const [state, setState] = useState(initial)
    const submitHandler = (e) => {
        e.preventDefault()
        if (validateEmail(state.email)) {
            let url = `https://localhost:44316/home/login`;
            let options = {
                method: 'POST',
                headers: {
                    'Content-Type':'application/json'
                },
                body: JSON.stringify(state)
            }
            fetch(url, options)
                .then(res => res.json())
                .then(json => {
                    if (json.status) {
                        setIsLoggedIn(true);
                        localStorage.setItem('token', json.token)
                        history.push('/home');
                    }
                    else {
                        alert("unable logIn");
                    }
                })
            .catch(err=>console.log(err))
        }
        else {
            alert("enter valid email !!");
        }
      
    }
    const onChangeHandler = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    }
    const validateEmail = (email) =>{
        const emailRex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (emailRex.test(email)) {
            return true;
        } else {
            return false;
        }
    }
        return (
            <Container className="App">
                <div style={{ textAlign:'center' }}>
                    <Facebook />
                    <Google />
                </div>
                <h2>Sign In</h2>
                <Form className="form" onSubmit={submitHandler}>
                    <Col>
                        <FormGroup>
                            <Label>Email</Label>
                            <Input
                                type="email"
                                name="email"
                                id="exampleEmail"
                                value={state.email}
                                placeholder="myemail@email.com"
                                onChange={onChangeHandler}
                            />
                        </FormGroup>
                    </Col>
                    <Col>
                        <FormGroup>
                            <Label for="examplePassword">Password</Label>
                            <Input
                                type="password"
                                name="password"
                                id="examplePassword"
                                placeholder="********"
                                value={state.password}
                                onChange={onChangeHandler}
                            />
                        </FormGroup>
                    </Col>
                    <Button>Login</Button>
                </Form>
            </Container>
   ) 
}

export default LoginForm;