import React, { useEffect } from 'react';
import { JitsiMeeting } from '@jitsi/react-sdk';

const JitsiMeetCall = ({ domain, roomName, displayName }) => {
    // JWT token generated by your backend
    const jwtToken = 'YOUR_JWT_TOKEN_HERE'; // Replace with your actual JWT token

    return (
        <div style={{ height: '100vh', width: '100vw' }}>
            <JitsiMeeting
                domain={domain}
                roomName={roomName}
                configOverwrite={{
                    // Optional configurations
                }}
                interfaceConfigOverwrite={{
                    // Optional interface configurations
                }}
                userInfo={{
                    displayName: {displayName},
                }}
                jwt={jwtToken} // Pass the JWT token as a property for JWT authentication
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