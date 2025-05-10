"use client";

import Image from "next/image";

// import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
// import { avatarImages } from "@/constants";
import { useToast } from "./ui/use-toast";

interface MeetingCardProps {
  title: string;
  date: string;
  icon: string;
  isPreviousMeeting?: boolean;
  buttonIcon1?: string;
  buttonText?: string;
  handleClick: () => void;
  link: string;
  duration?: string;
  creator: any;
  isRecording?: boolean,
  durationRecording?: string,
  isUpcoming?: boolean
}

const MeetingCard = ({
  icon,
  title,
  date,
  isPreviousMeeting,
  buttonIcon1,
  handleClick,
  link,
  buttonText,
  duration,
  creator,
  isRecording,
  durationRecording,
  isUpcoming
}: MeetingCardProps) => {
  const { toast } = useToast();
  console.log(creator)
  return (
    <section className="flex min-h-[258px] w-full flex-col justify-between rounded-[14px] bg-dark-1 px-5 py-8 xl:max-w-[568px]">
      <article className="flex flex-col gap-5">
        <Image src={icon} alt="upcoming" width={28} height={28} />
        <div className="flex justify-between">
          <div className="flex flex-col gap-2">
            <h1 className="text-2xl font-bold">{title}</h1>
            <p className="text-base font-normal">{date}</p>
          </div>
        </div>
      </article>
      <article>
        {/* <div className="relative flex w-full max-sm:hidden">
          {avatarImages.map((img, index) => (
            <Image
              key={index}
              src={img}
              alt="attendees"
              width={40}
              height={40}
              className={cn("rounded-full", { absolute: index > 0 })}
              style={{ top: 0, left: index * 28 }}
            />
          ))}
          <div className="flex-center absolute left-[136px] size-10 rounded-full border-[5px] border-dark-3 bg-dark-4">
            +5
          </div>
        </div> */}
        {isPreviousMeeting && <div className="text-base font-normal">
          <div className="flex gap-6 items-center mb-2 pt-5">
            Hosted by: {creator.name}
            <Image
              key={creator.id}
              src={creator.image}
              alt="attendees"
              width={40}
              height={40}
              className={"rounded-full"}
            />
          </div>

          <div className="flex items-center">
            <p className="mr-1">Duration: </p>
            {duration || "0 seconds"}
          </div>


        </div>}

        {isRecording && (
          <div className="mt-3 pb-6 flex">
            <p className="mr-1">Duration: </p>
            {durationRecording || "0 seconds"}
          </div>
        )}

        {isUpcoming && (
          <div className="text-base font-normal mt-2 mb-7">
            <div className="flex gap-6 items-center">
              Created by: {creator.name}
              <Image
                key={creator.id}
                src={creator.image}
                alt="attendees"
                width={40}
                height={40}
                className={"rounded-full"}
              />
            </div>  
          </div>
        )}


        {!isPreviousMeeting && (
          <div className="flex gap-4 justify-center">
            <Button onClick={handleClick} className="rounded bg-blue-1 px-6 text-center">
              {buttonIcon1 && (
                <Image src={buttonIcon1} alt="feature" width={20} height={20} className="mr-2" />
              )}
              {buttonText}
            </Button>
            <Button
              onClick={() => {
                navigator.clipboard.writeText(link);
                toast({
                  title: "Link Copied",
                });
              }}
              className="bg-dark-4 px-6"
            >
              <Image
                src="/icons/copy.svg"
                alt="feature"
                width={20}
                height={20}
              />
              &nbsp; Copy Link
            </Button>
          </div>
        )}
      </article>
    </section>
  );
};

export default MeetingCard;
