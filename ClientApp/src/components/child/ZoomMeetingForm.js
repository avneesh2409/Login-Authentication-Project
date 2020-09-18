import React, { useState } from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

const ZoomMeetingForm = (props) => {
    const initial = {
        topic: "",
        type: 1,
        start_time: new Date().toUTCString(),
        timezone: "UTC",
        password:"",
        agenda: "",
        duration:30
    }
    const [state,setState] = useState(initial)
    const onSubmitHandler = (e) => {
        e.preventDefault()
        console.log(state)
        let result = localStorage.getItem('access_token');
        fetch("https://localhost:44377/api/zoom/create-meeting",{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
                'Accept':'application/json'
            },
            body:JSON.stringify({
                    topic: "no where",
                    type: 1,
                    start_time: new Date().toUTCString(),
                    timezone: "UTC",
                    accesstoken:`${result}`,
                    password:'123456789',
                    agenda: "Nothing to worry almost done",
                    duration:30
            })
        }).then(res=>res.json())
        .then(json=>{
            if(json && json.result){
                window.location.href = json.result.start_url;
            }
            else{
                console.log("some problem occured")
            }
        }).catch(err=>console.log(err))
    }
    const changeHandler = (e) =>{
            setState({
                ...state,
                [e.target.name]:e.target.value
            })
    }
  return (
    <Form onSubmit={onSubmitHandler}>
      <FormGroup>
        <Label for="topic">Topic</Label>
        <Input type="text" name="topic" id="topic" placeholder="topic ...." value={state.topic} onChange={changeHandler} required />
        <FormText color="muted">
          This is some placeholder block-level help text for the above input.
          It's a bit lighter and easily wraps to a new line.
        </FormText>
      </FormGroup>
      <FormGroup>
        <Label for="exampleText">Agenda</Label>
        <Input type="text" name="agenda" id="exampleText" value={state.agenda} onChange={changeHandler} placeholder="Agenda......."  required />
        <FormText color="muted">
          This is some placeholder block-level help text for the above input.
          It's a bit lighter and easily wraps to a new line.
        </FormText>
      </FormGroup>
      <FormGroup>
        <Label for="nothing">Password</Label>
        <Input type="password" name="password" id="nothing" value={state.password} onChange={changeHandler} placeholder="Password.........." required />
        <FormText color="muted">
          This is some placeholder block-level help text for the above input.
          It's a bit lighter and easily wraps to a new line.
        </FormText>
      </FormGroup>
      <Button>Join Meeting</Button>
    </Form>
  );
}

export default ZoomMeetingForm;