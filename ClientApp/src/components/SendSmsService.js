import React, { useState } from 'react'
import {
    Container, Col, Form,
    FormGroup, Label, Input,
    Button,
} from 'reactstrap';

const SmsService = () => {
    const initial = {
        number: "",
        message:""
    }
    const [msgId, setMsgId] = useState('');
    const [state, setState] = useState(initial)
    const submitHandler = (e) => {
        e.preventDefault()
        if (validateNumber(state.number)) {
            if (state.message) {
                let url = `https://localhost:44316/home/sms`;
                let options = {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                       // 'Authorization': `Bearer ${localStorage.getItem('token')}`
                    },
                    body: JSON.stringify(state)
                }
                fetch(url, options)
                    .then(res => res.json())
                    .then(json => {
                        setState(initial)
                        setMsgId(json.data)
                    })
                .catch(err=>console.log(err))
            }
            else {
                alert("message box should not be empty !!");
            }
        }
        else {
            alert("enter valid number !!");
        }

    }
    const validateNumber = (number) => {
        let regex = new RegExp(/^((\+){1}91){1}[1-9]{1}[0-9]{9}$/);
        return regex.test('+91' + number);
    }
    const onChangeHandler = (e) => {
        setState({
            ...state,
            [e.target.name]:e.target.value
        })
    }
    return (
        <Container className="App">
            <h2>Sign In</h2>
            <Form className="form" onSubmit={submitHandler}>
                <Col>
                    <FormGroup>
                        <Label htmlFor="number">Number</Label>
                        <Input
                            type="text"
                            name="number"
                            id="number"
                            value={state.number}
                            placeholder="myemail@email.com"
                            onChange={onChangeHandler}
                        />
                    </FormGroup>
                </Col>
                <Col>
                    <FormGroup>
                        <Label for="message">Message</Label>
                        <Input
                            type="text"
                            name="message"
                            id="message"
                            value={state.message}
                            placeholder="Enter Message Here....."
                            onChange={onChangeHandler}
                        />
                    </FormGroup>
                </Col>
                <Button>Submit</Button>
            </Form>
        </Container>
        )
}
export default SmsService;