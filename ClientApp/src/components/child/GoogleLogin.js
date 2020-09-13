import React from 'react';
import GoogleLogin from 'react-google-login';


const Google = ({ setIsLoggedIn,history }) => {

const responseGoogle = (response) => {
    if (response) {
        console.log(response)
        if (!response.error) {
            localStorage.setItem("token", response.accessToken)
            setIsLoggedIn(true)
            history.push("/home");
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
            <GoogleLogin
                clientId="938461371335-t72n4l70hjlork97k04q3iro3qlj8ba4.apps.googleusercontent.com"
                buttonText="Google Login"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={'single_host_origin'}
            />
        </div>
    );
}
export default Google;
