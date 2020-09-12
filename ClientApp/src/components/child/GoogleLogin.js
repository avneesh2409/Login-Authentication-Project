import React from 'react';
import GoogleLogin from 'react-google-login';


const Google = ({ setStatus, setResponse }) => {

const responseGoogle = (response) => {
    if (response) {
            localStorage.setItem("access_token", response.accessToken)
            setStatus(true);
            setResponse(prev => ({ ...prev, data: response, image: response.profileObj.imageUrl, email: response.profileObj.email, error: response.error }))
        }
        else {
            setStatus(false)
        }
    /*
     * profileObj:
email: "avneeshdwivedi.tft@gmail.com"
familyName: "DWIVEDI"
givenName: "AVNEESH"
googleId: "108261736470244023317"
imageUrl: "https://lh3.googleusercontent.com/a-/AOh14GjSuTZ3RdJm59BwP0i5Mbt04rtmH0Oc-Y8Y2H2u=s96-c"
name: "AVNEESH DWIVEDI"
     * 
     * 
     * 
     * 
     access_token: "ya29.a0AfH6SMAzIONK2pGnVwdznsdyb2uRvcPuAuJLe2N5yDlh3-zZBSD5m2__ud90SFJKgtojhnzwQYfkzglvSe-B9cDTSvPos8dMmrFQHQqyADoSMXwN8YrKO_GsQj4jCKZA6syVI7QGAbcrgHgnrWexjNoXkTpW6FsjGLA"
expires_at: 1599728915205
expires_in: 3599
first_issued_at: 1599725316205
id_token: "eyJhbGciOiJSUzI1NiIsImtpZCI6IjNmMzMyYjNlOWI5MjhiZmU1MWJjZjRmOGRhNTQzY2M0YmQ5ZDQ3MjQiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJhY2NvdW50cy5nb29nbGUuY29tIiwiYXpwIjoiOTM4NDYxMzcxMzM1LXQ3Mm40bDcwaGpsb3JrOTdrMDRxM2lybzNxbGo4YmE0LmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwiYXVkIjoiOTM4NDYxMzcxMzM1LXQ3Mm40bDcwaGpsb3JrOTdrMDRxM2lybzNxbGo4YmE0LmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwic3ViIjoiMTA4MjYxNzM2NDcwMjQ0MDIzMzE3IiwiZW1haWwiOiJhdm5lZXNoZHdpdmVkaS50ZnRAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImF0X2hhc2giOiJRQnJtZXhHVXdCSmt0akRPWmFybFlnIiwibmFtZSI6IkFWTkVFU0ggRFdJVkVESSIsInBpY3R1cmUiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS0vQU9oMTRHalN1VFozUmRKbTU5QndQMGk1TWJ0MDRydG1IME9jLVk4WTJIMnU9czk2LWMiLCJnaXZlbl9uYW1lIjoiQVZORUVTSCIsImZhbWlseV9uYW1lIjoiRFdJVkVESSIsImxvY2FsZSI6ImVuIiwiaWF0IjoxNTk5NzI1MzE2LCJleHAiOjE1OTk3Mjg5MTYsImp0aSI6Ijk3NGY2MWY0ZDUyMjAxOTVhNjllOTgyODZmZDA2ZTNmMTU1MTNhYzIifQ.eZgOW1bNXuCMlQtQh__t4YB_-r0yedA42enCdJTNmbyhpH5di_dgWxIuVbYVWu6NruOMf95H7tie3J7BTS5Yt6tVFgu26NmDi188_Rqy3unTSgIMpAxvJz507dijorLEr9E3qn4pSlEbgoUlkwHTevMSJ57K19-xz2eZYMNeh9A7Ist59qnkJSn5ILxGPkdYNmQkKTBaoLnJ227WpIjODj7gGwKoSZQTAQzezYKw3clrvDKuJDQ2RcviCiE7EaZpDBryvUqt4Eizsf0U6-KyXIGH5UMML-lAbhQhd0HF9d_GHwkqe8-13tbPbFhx6xCs-hM2PomkNEqYZ3_4-f4hsw"
idpId: "google"
login_hint: "AJDLj6J9nXGC8nvyinFBHbJdEwBhleO_OOZQp76_H1t1xcUrc4kwXZ_7lCzWHCfKZUFhuZAuo50nQoln69HKyqBL8TbV8-a7tg"
scope: "email profile https://w
     */
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
