"use client";
import { useEffect, useState } from "react";
import type { Event } from "../../../../types/event";

export default function EventElement(event: Event) {

  const date = new Date(event.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',  
    day: 'numeric'
  });


  return (
    <div className=" max-w-450 m-5 bg rounded-[5%]">
      <h2 className="text-xl mb-5 ">{event.name}</h2>
      <p>
        <strong>Date:</strong> {  date }
      </p>
      <p>
        <strong>Location:</strong> {event.location}
      </p>
      <p>
        <strong>Genre:</strong> {event.genre}
      </p>
      <p>
        <strong>Duration:</strong> {event.duration}
      </p>
      <p>
        <strong>Max Capacity:</strong> {event.maxCapacity}
      </p>
      <p>
        <strong>Link:</strong>{" "}
        <a href={event.link} className="text-blue-500 hover:underline">
          {event.link}
        </a>
      </p>
      
    </div>
  );
};

