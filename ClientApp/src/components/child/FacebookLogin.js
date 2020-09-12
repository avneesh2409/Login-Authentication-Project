import React from 'react';
import FacebookLogin from 'react-facebook-login';


const Facebook = ({ setStatus,setResponse }) => {

    const responseFacebook = (response) => {
        if (response) {
            console.log(response)
            localStorage.setItem("access_token", response.accessToken)
            setStatus(true);
            setResponse(prev => ({ ...prev, data: response, image: response.picture.data.url, email: response.email, error: response.error }))
        }
        else {
            setStatus(false)
        }

        /*
            name: "Tftus Limit", email: "avnd1998@gmail.com",…}
            email: "avnd1998@gmail.com"
            id: "100577861798590"
            name: "Tftus Limit"
            picture: {data: {height: 50, is_silhouette: true,…}}
            data: {height: 50, is_silhouette: true,…}
            height: 50
            is_silhouette: true
            url: ""
            width: 50
         */
    }

    return (
        <div>
            <FacebookLogin
                appId="797770164383826"
                fields="name,email,picture"
                callback={responseFacebook}
            />
        </div>
    );
}
export default Facebook;
