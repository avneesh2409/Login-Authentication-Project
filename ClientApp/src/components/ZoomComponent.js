import React, { useEffect} from 'react'
import ZoomMeetingForm from './child/ZoomMeetingForm';

export default function Zoomcomponent(props) {
    let {location,history} = props;
    useEffect(()=>{
        let obj = {};
        if(location.search){
            location.search.substr(1).split("&").forEach(e=>{
                let [key,value] = e.split("=");
                obj[`${key}`] = value;
            })
        }
        console.log("got the code :-",obj);
        if(obj.code){
            fetch(`https://localhost:44377/api/zoom/access-token?code=${obj.code}&state=${obj.state}`).then(res=>res.json()).then(json=>{
                if(json){
                    localStorage.setItem("access_token",json.access_token)
                    console.log("access token:-",json)
                }
                else{
                    console.log("error in token response");
                }
        
                })
                .catch(err=>console.log(err))
        }
        else{
            console.log("unable to fetch code from the server");
        }
    },[])
   
    return (
        <>
            {/* <Button onClick={joinHandler} >join meeting</Button> */}
            <ZoomMeetingForm />
        </>
    )
}
