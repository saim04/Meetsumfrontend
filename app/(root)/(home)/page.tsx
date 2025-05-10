"use client"
import MeetingTypeList from '@/components/MeetingTypeList';
import { useEffect, useState } from 'react';

const Home = () => {
  // Initialize state variables for time and date
  const [time, setTime] = useState('');
  const [date, setDate] = useState('');

  // Function to update time and date
  const updateTimeAndDate = () => {
    const now = new Date();
    const formattedTime = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    const formattedDate = (new Intl.DateTimeFormat('en-US', { dateStyle: 'full' })).format(now);
    setTime(formattedTime); // Update time state
    setDate(formattedDate); // Update date state
  };

  // useEffect to run the updateTimeAndDate function initially and on timer interval
  useEffect(() => {
    // Update time and date immediately when component mounts
    updateTimeAndDate();

    // Set up interval to update time and date every 60 seconds
    const intervalId = setInterval(() => {
      updateTimeAndDate(); // Update time and date every 60 seconds
    }, 1000); // Interval set to 60 seconds (60 * 1000 milliseconds)

    // Clean up the interval to prevent memory leaks when component unmounts
    return () => clearInterval(intervalId);
  }, []); // Empty dependency array ensures useEffect runs only once on mount

  return (
    <section className="flex size-full flex-col gap-5 text-white">
      <div className="h-[303px] w-full rounded-[20px] bg-hero bg-cover">
        <div className="flex h-full flex-col justify-between max-md:px-5 max-md:py-8 lg:p-11">
          <h2 className="glassmorphism max-w-[273px] rounded py-2 text-center text-base font-normal">
            Upcoming Meeting at: 12:30 PM
          </h2>
          <div className="flex flex-col gap-2">
            <h1 className="text-4xl font-extrabold lg:text-7xl">{time}</h1>
            <p className="text-lg font-medium text-sky-1 lg:text-2xl">{date}</p>
          </div>
        </div>
      </div>

      <MeetingTypeList />
    </section>
  );
};

export default Home;
