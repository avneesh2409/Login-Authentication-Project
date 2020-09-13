import React, { useState } from 'react'
import {
    Container, Col, Form,
    FormGroup, Label, Input,
    Button,
} from 'reactstrap';
import { LOGIN, POST_USER_URL } from '../../constants';

const RegistrationForm = ({ history }) => {
    const initial = {
        name: "",
        username: "",
        password: '',
        image: "https://via.placeholder.com/300.png/09f/fff%20C/O%20https://placeholder.com/",
        contact:""
    }
    const [state, setState] = useState(initial)
    const submitHandler = (e) => {
        e.preventDefault()
        if (validateEmail(state.username)) {
            if (validateNumber(state.contact)) {
                let options = {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(state)
                }
                fetch(`${POST_USER_URL}`, options)
                    .then(res => res.json())
                    .then(json => {
                        console.log("response :-", json)
                        if (json) {
                            alert("successfully registered !!");
                            setState(initial)
                            history.push(LOGIN);
                        }
                        else {
                            alert("unable to register");
                        }
                    })
                    .catch(err => console.log(err))
            }
            else {
                alert("Enter Valid Contact Number !!")
            }
        }
        else {
            alert("Enter valid Email");
        }   
    }
    const validateNumber = (number) => {
        let regex = new RegExp(/^((\+){1}91){1}[1-9]{1}[0-9]{9}$/);
        return regex.test('+91' + number);
    }
    const validateEmail = (email) => {
        const emailRex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (emailRex.test(email)) {
            return true;
        } else {
            return false;
        }
    }
    const onChangeHandler = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    }
    return (
        <Container className="App">
            <h2>Register</h2>
            <Form className="form" onSubmit={submitHandler}>
                <Col>
                    <FormGroup>
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                            type="text"
                            name="name"
                            id="name"
                            value={state.name}
                            placeholder="Enter your Name"
                            onChange={onChangeHandler}
                        />
                    </FormGroup>
                </Col>
                <Col>
                    <FormGroup>
                        <Label htmlFor="email">Email</Label>
                        <Input
                            type="email"
                            value={state.username}
                            name="username"
                            id="email"
                            placeholder="Enter Email "
                            onChange={onChangeHandler}
                        />
                    </FormGroup>
                </Col>
                <Col>
                    <FormGroup>
                        <Label htmlFor="password">Password</Label>
                        <Input
                            type="password"
                            value={state.password}
                            name="password"
                            id="password"
                            placeholder="Enter Password"
                            onChange={onChangeHandler}
                        />
                    </FormGroup>
                </Col>
                <Col>
                    <FormGroup>
                        <Label htmlFor="contact">Contact</Label>
                        <Input
                            type="text"
                            value={state.contact}
                            name="contact"
                            id="contact"
                            placeholder="Enter Your Number"
                            onChange={onChangeHandler}
                        />
                    </FormGroup>
                </Col>
                <Button>Submit</Button>
            </Form>
        </Container>
    )
}
export default RegistrationForm;