'use client';
import { useEffect, useState } from 'react';
import {
  DeviceSettings,
  VideoPreview,
  useCall,
  useCallStateHooks
} from '@stream-io/video-react-sdk';

import Alert from './Alert';
import { Button } from './ui/button';
import { useToast } from './ui/use-toast';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
// import { useRouter } from 'next/navigation';

const MeetingSetup = ({
  setIsSetupComplete,
}: {
  setIsSetupComplete: (value: boolean) => void;
}) => {
  // https://getstream.io/video/docs/react/guides/call-and-participant-state/#call-state
  const { useCallEndedAt, useCallStartsAt } = useCallStateHooks();
  const callStartsAt = useCallStartsAt();
  const callEndedAt = useCallEndedAt();
  const callTimeNotArrived =
    callStartsAt && new Date(callStartsAt) > new Date();
  const callHasEnded = !!callEndedAt;

  const call = useCall();
  const { toast } = useToast();
  // const router = useRouter();

  if (!call) {
    throw new Error(
      'useStreamCall must be used within a StreamCall component.',
    );
  }

  // https://getstream.io/video/docs/react/ui-cookbook/replacing-call-controls/
  const [isMicCamToggled, setIsMicCamToggled] = useState(false);

  useEffect(() => {
    if (isMicCamToggled) {
      call.camera.disable();
      call.microphone.disable();
    } else {
      call.camera.enable();
      call.microphone.enable();
    }
  }, [isMicCamToggled, call.camera, call.microphone]);

  if (callTimeNotArrived)
    return (
      <Alert
        title={`Your Meeting has not started yet. It is scheduled for ${callStartsAt.toLocaleString()}`}
      />
    );

  if (callHasEnded)
    return (
      <Alert
        title="The call has been ended by the host"
        iconUrl="/icons/call-ended.svg"
      />
    );

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-3 text-white">
      <div className='flex justify-between gap-3 items-center'>
        <div className='-ml-12'>
          <Button
            className="rounded-md bg-dark-2 px-4 py-2.5"
            title='Back'
            onClick={async () => {
              await call.leave();
              window.location.href = `${process.env.NEXT_PUBLIC_BASE_URL}`
            }}
          >
            <FontAwesomeIcon icon={faArrowLeft} style={{ color: 'white', height: "20px" }} />
          </Button>
        </div>
        <div>
          <h1 className="text-center text-2xl font-bold">Setup</h1>
        </div>
      </div>
      <VideoPreview />
      <div className="flex h-16 items-center justify-center gap-3">
        <label className="flex items-center justify-center gap-2 font-medium cursor-pointer">
          <input
            type="checkbox"
            checked={isMicCamToggled}
            onChange={(e) => setIsMicCamToggled(e.target.checked)}
            style={{cursor: "pointer"}}
          />
          Join with mic and camera off
        </label>
        <DeviceSettings />
      </div>
      <div className="flex gap-5">

        <Button
          className="rounded-md bg-green-500 px-4 py-2.5"
          onClick={() => {
            call.join();

            setIsSetupComplete(true);
          }}
        >
          Join meeting
        </Button>
        <Button
          className="rounded-md bg-dark-2 px-4 py-2.5"
          onClick={() => {
            navigator.clipboard.writeText(window.location.href);
            toast({
              title: "Link Copied",
            });
          }}
        >
          Copy Link
        </Button>
      </div>
    </div>
  );
};

export default MeetingSetup;
