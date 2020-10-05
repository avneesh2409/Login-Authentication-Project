import React, { useEffect, useState } from 'react'
//import { Button } from 'reactstrap';

const Redirectroute = (props) =>{
    const { location } = props;
    const [state, setState] = useState({})
    useEffect(()=>{
        if (location.search) {
            location.search.split("?")[1].split("&").forEach(e => {
                let [key, value] = e.split("=");
                setState({
                    ...state,
                    [key]: value
                })
            })
        }
        else {
            alert("Transaction failed !!")
        }
    }, [])
    console.log(state)
  return (
        <>
          Hello We are in Redirect Page
          {
              (state.refReqId) ? <h1>Transaction Successfull Transaction Id :- {state.refReqId}</h1>:<h1>Transaction Failed</h1>
          }
        </>
    )
}
export default Redirectroute;