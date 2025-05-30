'use client';

import { Call, CallRecording } from '@stream-io/video-react-sdk';

import Loader from './Loader';
import { useGetCalls } from '@/hooks/useGetCalls';
import MeetingCard from './MeetingCard';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface CallListProps {
  type: 'ended' | 'upcoming' | 'recordings';
  setGPTLoader: React.Dispatch<React.SetStateAction<boolean>>;
}

const CallList = ({ type, setGPTLoader }: CallListProps) => {
  const router = useRouter();
  const { endedCalls, upcomingCalls, callRecordings, isLoading } =
    useGetCalls();
  const [recordings, setRecordings] = useState<CallRecording[]>([]);
  const getCalls = () => {
    switch (type) {
      case 'ended':
        return endedCalls;
      case 'recordings':
        return recordings;
      case 'upcoming':
        return upcomingCalls;
      default:
        return [];
    }
  };

  const getNoCallsMessage = () => {
    switch (type) {
      case 'ended':
        return 'No Previous Calls';
      case 'upcoming':
        return 'No Upcoming Calls';
      case 'recordings':
        return 'No Recordings';
      default:
        return '';
    }
  };

  const getCreator = (meeting: any) => {
    if (type === 'ended' || type === 'upcoming') {
      const creator = (meeting as Call).state?.createdBy;
      return creator;
    }
  };

  const calculateDuration = (meeting: Call) => {
    if (type === 'ended') {
      const startsAt = (meeting as Call).state?.startsAt;
      const endsAt = (meeting as Call).state?.endedAt;
      if (startsAt && endsAt) {
        // Calculate the difference in milliseconds
        const durationMs = endsAt.getTime() - startsAt.getTime();

        // Convert milliseconds to seconds
        const durationSeconds = Math.floor(durationMs / 1000);

        // Return duration in seconds if less than a minute
        if (durationSeconds < 60) {
          return `${durationSeconds} seconds`;
        } else {
          // Calculate duration in minutes if more than or equal to a minute
          const durationMinutes = Math.floor(durationSeconds / 60);
          return `${durationMinutes} minutes`;
        }
      }
    }

    return ''; // For other types, duration might not be applicable
  };

  const calculateDurationOfRecording = (meeting: CallRecording) => {
    if (type === 'recordings') {
      const startsAt = new Date((meeting as CallRecording).start_time);
      const endsAt = new Date((meeting as CallRecording).end_time);

      // Calculate the difference in milliseconds
      const durationMs = endsAt.getTime() - startsAt.getTime();

      // Convert milliseconds to seconds
      const durationSeconds = Math.floor(durationMs / 1000);

      // Return duration in seconds if less than a minute
      if (durationSeconds < 60) {
        return `${durationSeconds} seconds`;
      } else {
        // Calculate duration in minutes if more than or equal to a minute
        const durationMinutes = Math.floor(durationSeconds / 60);
        return `${durationMinutes} minutes`;
      }
    }

    return '';
  };

  useEffect(() => {
    const fetchRecordings = async () => {
      const callData = await Promise.all(
        callRecordings?.map((meeting) => meeting.queryRecordings()) ?? [],
      );
      console.log('CALLDATA', callData);

      const recordings = callData
        .filter((call) => call.recordings.length > 0)
        .flatMap((call) => call.recordings);

      setRecordings(recordings);
    };

    if (type === 'recordings') {
      fetchRecordings();
    }
  }, [type, callRecordings]);

  if (isLoading) return <Loader />;

  const calls = getCalls();
  const noCallsMessage = getNoCallsMessage();

  return (
    <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
      {calls && calls.length > 0 ? (
        calls.map((meeting: Call | CallRecording, index) => (
          <MeetingCard
            setGPTLoader={setGPTLoader}
            key={index}
            icon={
              type === 'ended'
                ? '/icons/previous.svg'
                : type === 'upcoming'
                  ? '/icons/upcoming.svg'
                  : '/icons/recordings.svg'
            }
            title={
              (meeting as Call).state?.custom?.description ||
              (meeting as CallRecording).filename?.substring(0, 20) ||
              'No Description'
            }
            date={
              (meeting as Call).state?.startsAt?.toLocaleString() ||
              new Date((meeting as CallRecording).start_time)?.toLocaleString()
            }
            isPreviousMeeting={type === 'ended'}
            isRecording={type === 'recordings'}
            isUpcoming={type === 'upcoming'}
            link={
              type === 'recordings'
                ? (meeting as CallRecording).url
                : `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${(meeting as Call).id}`
            }
            buttonIcon1={type === 'recordings' ? '/icons/play.svg' : undefined}
            buttonText={type === 'recordings' ? 'Play' : 'Start'}
            handleClick={
              type === 'recordings'
                ? () => router.push(`${(meeting as CallRecording).url}`)
                : () => router.push(`/meeting/${(meeting as Call).id}`)
            }
            duration={calculateDuration(meeting as Call)}
            creator={getCreator(meeting as Call)}
            durationRecording={calculateDurationOfRecording(
              meeting as CallRecording,
            )}
          />
        ))
      ) : (
        <h1 className="text-2xl font-bold text-white">{noCallsMessage}</h1>
      )}
    </div>
  );
};

export default CallList;
