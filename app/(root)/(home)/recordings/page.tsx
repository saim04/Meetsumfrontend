"use client"
import CallList from '@/components/CallList';
import GPTLoader from '@/components/GPTloader';
import { useState } from 'react';

const PreviousPage = () => {
  const [gptLoader , setGPTLoader] = useState(false)
  return (
    <section className="flex size-full flex-col gap-10 text-white">
      <h1 className="text-3xl font-bold">Recordings</h1>

      <CallList setGPTLoader={setGPTLoader} type="recordings" />
      {
        gptLoader && (<GPTLoader />)
      }
    </section>
  );
};

export default PreviousPage;
