"use client";
import { useParams } from "next/navigation";

export default function MeetingPage() {
  const { roomId } = useParams();

  if (!roomId) return <h1 className="text-center">Invalid Room ID</h1>;

  return <div className="h-screen"></div>;
}
