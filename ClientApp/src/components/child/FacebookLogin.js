import React from 'react';
import FacebookLogin from 'react-facebook-login';


const Facebook = ({ setIsLoggedIn,history }) => {

    const responseFacebook = (response) => {
        if (response) {
            console.log(response);
            if (!response.error) {
                localStorage.setItem("token", response.accessToken)
                setIsLoggedIn(true)
                history.push("/home")
            }
            else {
                setIsLoggedIn(false)
            }
        }
        else {
            setIsLoggedIn(false)
        }
    }

    return (
        <div>
            <FacebookLogin
                appId="797770164383826"
                fields="email"
                callback={responseFacebook}
            />
        </div>
    );
}
export default Facebook;
