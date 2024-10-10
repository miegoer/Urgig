import React, { useEffect, useRef } from "react";
import Talk from "talkjs";

// Define the User interface that will be passed to the component
interface User {
  id: string;
  name: string;
  email: string;
  photoUrl?: string;
  welcomeMessage?: string;
}

interface TalkInboxPopupProps {
  user: User;
}

const TalkInboxPopup: React.FC<TalkInboxPopupProps> = ({ user }) => {
  const talkjsContainerRef = useRef<HTMLDivElement | null>(null);
  const inboxRef = useRef<Talk.Inbox | null>(null);

  useEffect(() => {
    Talk.ready.then(() => {
      const session = new Talk.Session({
        appId: process.env.NEXT_PUBLIC_TALKJS_APP_ID!, // Replace with your TalkJS App ID
        me: user,
      });

      inboxRef.current = session.createInbox();
      inboxRef.current.mount(talkjsContainerRef.current!);

      return () => {
        inboxRef.current?.destroy();
      };
    });
  }, [user]);

  return (
    <div style={popupStyles}>
      <div ref={talkjsContainerRef} style={{ height: "500px", width: "400px" }}></div>
    </div>
  );
};

// Simple styles for the popup/modal
const popupStyles: React.CSSProperties = {
  position: "absolute",
  top: "50%",
  right: "10px",
  transform: "translate(-50%, -50%)",
  zIndex: 1000,
  padding: "20px",
  borderRadius: "8px",
};

export default TalkInboxPopup;