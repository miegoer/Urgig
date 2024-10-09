'use client';

import React, { useCallback, useState } from "react";
import Talk from "talkjs";
import TalkInboxPopup from "./inboxPop"; // Import the popup component

const App: React.FC = () => {
  const [isPopupVisible, setPopupVisible] = useState(false);

  // The syncUser callback creates the user object
  const syncUser = useCallback(
    () =>
      new Talk.User({
        id: "nina",
        name: "Nina",
        email: "nina@example.com",
        photoUrl: "https://talkjs.com/new-web/avatar-7.jpg",
        welcomeMessage: "Hi!",
        role: "user"
      }),
    []
  );

  const togglePopup = () => {
    setPopupVisible((prev) => !prev);
  };

  return (
    <div>
      <h1>Chat Application</h1>
      {/* Button to toggle the popup */}
      <button onClick={togglePopup}>
        {isPopupVisible ? "Close Inbox" : "Open Inbox"}
      </button>

      {/* Pass the visibility and user to the popup component */}
      {isPopupVisible && <TalkInboxPopup user={syncUser()} />}
    </div>
  );
};

export default App;