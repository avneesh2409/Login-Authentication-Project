import React from 'react';
//import { ZoomMtg } from '@zoomus/websdk'


export const Home = () => {
	// const meetConfig = {
	// 	apiKey: 'pJde2K3wTYq0nP3wA5kQsQ',
	// 	meetingNumber: '123456789',
	// 	leaveUrl: 'https://yoursite.com/meetingEnd',
	// 	userName: 'Firstname Lastname',
	// 	userEmail: 'firstname.lastname@yoursite.com',
	// 	passWord: 'password', // if required
	// 	role: 1 // 1 for host; 0 for attendee
	// };
	// const signature = "cEpkZTJLM3dUWXEwblAzd0E1a1FzUS4xMjM0NTY3ODkuMTYwMDE1OTYwMzUwNC4xLlB2c2J5ZXo3WEpWQTNTRzVsd1dLOGY0VjRzVmFpcEQwQkltdUw5c0xuT3M9";
	// //useEffect(() => {
	//	ZoomMtg.preLoadWasm();
	//	ZoomMtg.prepareJssdk();
	//}, [])

//const getSignature = (meetConfig) =>{
//		ZoomMtg.init({
//						leaveUrl: meetConfig.leaveUrl,
//						isSupportAV: true,
//						success: function () {
//							ZoomMtg.join({
//								signature: signature,
//								apiKey: meetConfig.apiKey,
//								meetingNumber: meetConfig.meetingNumber,
//								userName: meetConfig.userName,
//								// password optional; set by Host
//								passWord: meetConfig.passWord,
//								error:(res)=>console.log(res)	
//							})
//						}
//				})
//}
    return (
      <div>
			<h6>Welcome to Home Page</h6>
			<button onClick={() => console.log("hello")}>join here</button>
      </div>
    );
}
