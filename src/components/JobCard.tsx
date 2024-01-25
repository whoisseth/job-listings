/** @format */

import { cn } from "@/utils/cn";
import React from "react";

export interface JobType {
  id: number;
  company: string;
  logo: string;
  new: boolean;
  featured: boolean;
  position: string;
  role: string;
  level: string;
  postedAt: string;
  contract: string;
  location: string;
  languages?: string[];
  tools?: string[];
  //
}

interface JobCardType extends JobType {
  activeTags: string[];
  handleClick: (tag: string) => void;
}

type Props = {};

import smapelImge from "@/assets/images/photosnap.svg";
import Image from "next/image";

export default function JobCard(props: JobCardType) {
  //   console.log("activeTags", props.activeTags);
  return (
    <div
      className={cn(
        "bg-white shadow-lg rounded justify-between flex w-full  md:items-center  px-6 py-4  flex-col md:flex-row relative gap-4 pb-6 ",
        { "border-l-4 border-desaturated-cyan": props.new }
      )}
    >
      {/*  max-w-[768px]  */}
      {/* left side */}
      <div className="flex gap-4">
        <Image
          width={200}
          height={200}
          className="h-[50px] w-[50px] md:h-[70px] md:w-[70px] absolute md:static top-[-20px] left-[20px]"
          src={props.logo}
          alt="job-list-img"
        />
        {/* job details */}
        <div className="flex flex-col gap-2 pt-10 md:pt-0">
          <section className="flex text-sm gap-5 items-center">
            {/* compnay name */}
            <p className="font-bold text-desaturated-cyan"> {props.company}</p>
            {/* is this a new job */}
            <div className="flex gap-1 text-xs items-center font-bold text-white">
              {props.new && (
                <div className="bg-desaturated-cyan rounded-full px-2 py-0.5 ">
                  NEW!
                </div>
              )}
              {/*  */}
              {/* is this a FEATURED job */}
              {props.featured && (
                <div className="bg-slate-800  rounded-full px-2 py-0.5 ">
                  FEATURED
                </div>
              )}
            </div>
          </section>
          {/* potions */}
          <p className="font-bold">{props.position}</p>

          <section className="flex gap-3 text-xs text-gray-600">
            {/* postedAt */}
            <p>{props.postedAt}</p>
            {/* contract */}
            <p>. {props.contract}</p>
            {/* "location": */}
            <p>. {props.location}</p>
          </section>
        </div>
      </div>
      {/* right side */}
      <hr className="md:hidden" />
      {/* <div className="h-[2px] bg-gray-400 " /> */}
      <div className="flex gap-3">
        {/* tag */}
        {props?.languages?.map((d, i) => (
          <button
            onClick={() => props.handleClick(d)}
            key={i}
            //
            className={cn(
              "text-desaturated-cyan  bg-[hsl(180,52%,96%)] px-2 py-0.5 rounded font-bold hover:text-white hover:bg-desaturated-cyan  text-sm",
              {
                "bg-desaturated-cyan text-white": props.activeTags?.includes(d)
              }
            )}
          >
            {d}
          </button>
        ))}
        {props?.tools?.map((d, i) => (
          <button
            onClick={() => props.handleClick(d)}
            key={i}
            className={cn(
              "text-desaturated-cyan  bg-[hsl(180,52%,96%)] px-2 py-0.5 rounded font-bold hover:text-white hover:bg-desaturated-cyan  text-sm ",
              {
                "bg-desaturated-cyan text-white": props.activeTags?.includes(d)
              }
            )}
          >
            {d}
          </button>
        ))}
      </div>
    </div>
  );
}
