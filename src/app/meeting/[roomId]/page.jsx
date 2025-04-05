"use client";
import { useParams } from "next/navigation";
import { JitsiMeeting } from "@jitsi/react-sdk";

export default function MeetingPage() {
  const { roomId } = useParams();

  if (!roomId) return <h1 className="text-center">Invalid Room ID</h1>;

  return (
    <div className="h-screen">
      <JitsiMeeting
        roomName={roomId}
        configOverwrite={{
          startWithAudioMuted: false,
          startWithVideoMuted: false,
          enableRecording: true,
        }}
        userInfo={{ displayName: "User" }}
        getIFrameRef={(iframe) => (iframe.style.height = "100vh")}
      />
    </div>
  );
}
