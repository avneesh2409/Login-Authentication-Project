import React, { useEffect } from 'react'


const Logout = ({ history,setIsLoggedIn}) => {
    useEffect(() => {
        localStorage.clear();
        sessionStorage.clear();
        setIsLoggedIn(false);
        history.push('/');
    },[]);
    return (
        <></>
        )
}
export default Logout;