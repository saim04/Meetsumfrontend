"use client"
import { useCall, useCallStateHooks } from '@stream-io/video-react-sdk';
import { Button } from './ui/button';

const EndCallButton = () => {
  const call = useCall();
  const { useLocalParticipant } = useCallStateHooks();
  const localParticipant = useLocalParticipant();
  
  if (!call) {
    throw new Error('useStreamCall must be used within a StreamCall component.');
  }

  const isMeetingOwner =
    localParticipant &&
    call.state.createdBy &&
    localParticipant.userId === call.state.createdBy.id;

  const endCall = async () => {
    await call.endCall();
    
    window.location.href = `${process.env.NEXT_PUBLIC_BASE_URL}`;
  };

  if (!isMeetingOwner) {
    return null;
  }

  return (
    <>
      <Button onClick={endCall} className="bg-red-500 max-sm:hidden">
        End call for everyone
      </Button>
      <Button onClick={endCall} className="bg-red-500 sm:hidden">
        End call
      </Button>
    </>
  );
};

export default EndCallButton;
