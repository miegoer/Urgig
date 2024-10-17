import React, { useEffect, useRef } from 'react';
import { useTalkSession } from '@/app/(context)/TalkSessionContext';
import Talk from 'talkjs';

const TalkInboxPopup: React.FC = () => {
  const talkjsContainerRef = useRef<HTMLDivElement | null>(null);
  const inboxRef = useRef<Talk.Inbox | null>(null);
  const { session, userId } = useTalkSession();

  useEffect(() => {
    if (session && talkjsContainerRef.current) {
      inboxRef.current = session.createInbox();
      inboxRef.current.mount(talkjsContainerRef.current);
      console.log("popup ", userId)
      return () => {
        inboxRef.current?.destroy();
      };
    }
  }, [session]);

  return (
    <div style={popupStyles}>
      <div ref={talkjsContainerRef} style={{ height: '500px', width: '400px' }}></div>
    </div>
  );
};

const popupStyles: React.CSSProperties = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  zIndex: 1000,
  padding: '20px',
  borderRadius: '8px',
};

export default TalkInboxPopup;