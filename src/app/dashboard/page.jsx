"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const [roomId, setRoomId] = useState("");
  const router = useRouter();

  const handleJoinMeeting = () => {
    if (!roomId.trim()) return alert("Enter a valid meeting ID!");
    router.push(`/meeting/${roomId}`);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4">
      <h1 className="text-2xl font-bold">Join a Jitsi Meeting</h1>
      <input
        type="text"
        placeholder="Enter Meeting ID"
        value={roomId}
        onChange={(e) => setRoomId(e.target.value)}
        className="border p-2 rounded-md"
      />
      <button
        onClick={handleJoinMeeting}
        className="bg-blue-500 text-white px-4 py-2 rounded-md"
      >
        Join Meeting
      </button>
    </div>
  );
}
