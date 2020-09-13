import React, { useState } from 'react'
import {
    Container, Col, Form,
    FormGroup, Label, Input,
    Button,
} from 'reactstrap';
import { REGISTER, SENT_OTP_URL } from '../constants';

const SmsService = ({ setMsgId, setToggleOtp,history }) => {
    const initial = {
        number: ""
    }
    const [state, setState] = useState(initial)
    const submitHandler = (e) => {
        e.preventDefault()
        if (validateNumber(state.number)) {
            let url = `${SENT_OTP_URL}/${state.number}`;
                fetch(url)
                    .then(res => res.json())
                    .then(json => {
                        if (json.status) {
                            setState(initial)
                            setMsgId(json.data)
                            setToggleOtp(true)
                            alert("otp sent to your mobile phone !!");
                        }
                        else {
                            setState(initial)
                            alert(json.message)
                            history.push(REGISTER);
                        }
                    })
                .catch(err=>console.log(err))
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
            <Form className="form" onSubmit={submitHandler}>
                <Col>
                    <FormGroup>
                        <Label htmlFor="number">Number</Label>
                        <Input
                            type="text"
                            name="number"
                            id="number"
                            value={state.number}
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
export default SmsService;