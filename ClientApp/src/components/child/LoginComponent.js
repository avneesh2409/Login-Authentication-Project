import React, { useState, useEffect } from 'react'
import Facebook from './FacebookLogin';
import Google from './GoogleLogin';
import {
    Container, Col, Form,
    FormGroup, Label, Input,
    Button,
} from 'reactstrap';
import SmsService from '../SendSmsService';
import { LOGIN, VERIFY_OTP_URL, LOGIN_URL, HOME } from '../../constants';

const LoginForm = ({ history,setIsLoggedIn }) => {
    const initial = {
        email: "",
        password: "",
        otp: ""
    }
    const [state, setState] = useState(initial)
    const [toggleOtp, setToggleOtp] = useState(false);
    const [msgId, setMsgId] = useState('');
    const [selection, setSelection] = useState({
        facebook: false,
        google: false,
        email: false,
        otp: false
    })
    const submitHandler = (e) => {
        e.preventDefault()
        if (validateEmail(state.email)) {
            let url = LOGIN_URL;
            let data = {
                email: state.email,
                password: state.password
            }
            let options = {
                method: 'POST',
                headers: {
                    'Content-Type':'application/json'
                },
                body: JSON.stringify(data)
            }
            fetch(url, options)
                .then(res => res.json())
                .then(json => {
                    if (json.status) {
                        setIsLoggedIn(true);
                        localStorage.setItem('token', json.token)
                        history.push(HOME);
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
    const validateNumber = (number) => {
        let regex = new RegExp(/^[0-9]{6}$/);
        return regex.test(number);
    }
    const otpSubmitHandler = (e) => {
        e.preventDefault()
        if (validateNumber(state.otp)) {
            console.log("message Id :-", msgId)
            let url = `${VERIFY_OTP_URL}/${msgId}/${state.otp}`;
                    fetch(url)
                        .then(res => res.json())
                        .then(json => {
                            if (json.status) {
                                setState(initial)
                                localStorage.setItem('token', json.accessToken)
                                setIsLoggedIn(true);
                                history.push('/home');
                            }
                            else {
                                alert(json.message)
                            }   
                        })
                        .catch(err => console.log(err))
            }
            else {
                alert("enter valid Otp !!");
            }
    }
    const validateEmail = (email) =>{
        const emailRex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (emailRex.test(email)) {
            return true;
        } else {
            return false;
        }
    }
    const selectionChangedHandler = (event) => {
        let items = Object.keys(selection);
        items.forEach(e => {
            if (e === event.target.value) {
                selection[`${e}`] = true;
            }
            else {
                selection[`${e}`] = false;
            }
        })
        setSelection(s=>({...s, ...selection }));
    }
        return (
            <Container className="App">
                <div style={{ textAlign: "center" }}>
                    <Label>Login With :- </Label>
                    <select className="form-control" style={{width: '30vh', display: 'inline-block',margin: '3vh'}} onChange={selectionChangedHandler}>
                        <option>Select Login Option</option>
                        <option value="facebook">Facebook</option>
                        <option value="google">Google</option>
                        <option value="otp">Otp</option>
                        <option value="email">Email</option>
                    </select>
                </div>
                {
                    (selection.facebook) ? <div style={{ textAlign: 'center'}}>
                        <h2>Login With Facebook</h2>
                        <Facebook setIsLoggedIn={setIsLoggedIn} history={history} />
                    </div> : null
                }
                {
                    (selection.google) ? <div style={{ textAlign: 'center'}}>
                        <h2>Login With Google</h2>
                        <Google setIsLoggedIn={setIsLoggedIn} history={history} />
                    </div> : null
                }
                {
                    (selection.email) ? <div style={{ textAlign: 'center'}}>
                        <h2>Log In wih Email</h2>
                        <Form className="form" onSubmit={submitHandler}>
                            <Col>
                                <FormGroup>
                                    <Label htmlFor="exampleEmail">Email</Label>
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
                                    <Label htmlFor="examplePassword">Password</Label>
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
                    </div> : null
                }
                {
                    (selection.otp) ? <div style={{ textAlign: 'center'}}>
                        <h2>Login With Otp</h2>
                        {
                            (toggleOtp) ? <Form className="form" onSubmit={otpSubmitHandler}>
                                <Col>
                                    <FormGroup>
                                        <Label htmlFor="otp">Enter Otp</Label>
                                        <Input
                                            type="text"
                                            name="otp"
                                            id="otp"
                                            value={state.otp}
                                            placeholder="Enter Otp....."
                                            onChange={onChangeHandler}
                                        />
                                    </FormGroup>
                                </Col>
                                <Button>Send Otp</Button>
                            </Form> : <SmsService setMsgId={setMsgId} setToggleOtp={setToggleOtp} history={history}/>
                        }
                        
                    </div> : null
                }
              
            </Container>
   ) 
}

export default LoginForm;