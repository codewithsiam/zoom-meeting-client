import { useState } from "react";
import axios from "axios";

const ZoomMeeting = () => {
  const [meetingUrl, setMeetingUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const createMeeting = async () => {
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:5000/create-meeting");
      setMeetingUrl(response.data.join_url);
    } catch (error) {
      console.error("Error creating Zoom meeting:", error);
    }
    setLoading(false);
  };

  return (
    <div className="container">
      {!meetingUrl && (
        <button onClick={createMeeting} disabled={loading}>
          {loading ? "Creating Meeting..." : "Create Zoom Meeting"}
        </button>
      )}

      {meetingUrl && (
        <div className="meeting-container">
          <iframe
            src={meetingUrl}
            allow="camera; microphone; fullscreen"
          ></iframe>
        </div>
      )}
    </div>
  );
};

export default ZoomMeeting;
