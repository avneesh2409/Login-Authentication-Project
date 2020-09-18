import React, { useEffect, useState } from 'react'
import { Button } from 'reactstrap';

const Redirectroute = (props) =>{
    const {history,location} = props;
    const [state,setState] = useState({});
    console.log(props)
    useEffect(()=>{
            fetch(`https://localhost:44377/api/zoom/authorize`)
            .then(res=>res.json())
            .then(json=>{
                if(json){
                    setState({...json})
                }
            })
            .catch(err=>console.log("error coming :-",err))
    },[])
    const clickHandler = (e) =>{
        window.location.href = state.url;
    }
    console.log("url sent :-",state);
    return (
        <>
            <Button onClick={clickHandler} disabled={(state.url)?false:true}>Join Zoom</Button>
        </>
    )
}
export default Redirectroute;