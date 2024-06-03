"use client";

import EventCalendar from "./components/EventCalender";

export default function Home() {
  return (
    <>
      <div></div>
      <div className=" flex justify-center items-center h-full">
        <div>
          <h1 className="text-3xl font-bold my-6  text-center">
            Weekly Todo List
          </h1>
          <EventCalendar initialDate="2024-04-01" />
        </div>
      </div>
    </>
  );
}
