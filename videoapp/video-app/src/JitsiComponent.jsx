// src/JitsiComponent.js
import React from 'react';
import { JitsiMeeting } from '@jitsi/react-sdk';

const JitsiComponent = ({ roomName, userName }) => {
  return (
    <JitsiMeeting
      domain="meet.jit.si"
      roomName={roomName}
      configOverwrite={{
        prejoinPageEnabled: false,
      }}
      interfaceConfigOverwrite={{
        filmStripOnly: false,
        SHOW_JITSI_WATERMARK: false,
      }}
      userInfo={{
        displayName: userName,
      }}
      getIFrameRef={(iframeRef) => {
        iframeRef.style.height = '100vh';
      }}
    />
  );
};

export default JitsiComponent;
