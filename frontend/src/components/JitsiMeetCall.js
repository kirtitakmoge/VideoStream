import React from 'react';
import { JitsiMeeting } from '@jitsi/react-sdk';


const JitsiMeetCall = ({ roomName, displayName }) => {
    const jitsiDomain = 'connect.surgi-cloud.com';
    const appId = '5216'; 
    const appSecret = 'QxWZVaM9yBU=';
 const userId=123;
    const jwtToken =localStorage.getItem("token");

    return (
        <div style={{ height: '100vh', width: '100vw' }}>
            <JitsiMeeting
                domain={jitsiDomain}
                roomName={roomName}
           
                userInfo={{
                    displayName: displayName,
                }}
                onApiReady={(externalApi) => {
                    // Store the external API in state if you want to control the meeting later
                }}
                getIFrameRef={(iframeRef) => {
                    iframeRef.style.height = '100%';
                    iframeRef.style.width = '100%';
                }}
            />
        </div>
    );
};

export default JitsiMeetCall;
