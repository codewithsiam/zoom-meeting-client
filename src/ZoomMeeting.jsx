import { useState } from "react";
import axios from "axios";

const ZoomMeeting = () => {
  const [meetingUrl, setMeetingUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const createMeeting = async () => {
    setLoading(true);
    setCopied(false);
    try {
      const response = await axios.post(
        "https://zoom-meeting-iota.vercel.app/create-meeting"
      );
      setMeetingUrl(response.data.join_url);
    } catch (error) {
      console.error("Error creating Zoom meeting:", error);
    }
    setLoading(false);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(meetingUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="container text-center p-4">
      {!meetingUrl && (
        <button
          onClick={createMeeting}
          disabled={loading}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          {loading ? "Creating Meeting..." : "Create Zoom Meeting"}
        </button>
      )}

      {meetingUrl && (
        <div className="meeting-container mt-4 p-4 border rounded shadow-md">
          <p className="text-lg font-semibold">Meeting URL:</p>
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={meetingUrl}
              readOnly
              className="border p-2 w-full rounded"
            />
            <button
              onClick={copyToClipboard}
              className="bg-green-500 text-white px-3 py-2 rounded"
            >
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>

          <div className="mt-4">
            <iframe
              src={meetingUrl}
              allow="camera; microphone; fullscreen"
              className="w-full h-96 border rounded"
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );
};

export default ZoomMeeting;
