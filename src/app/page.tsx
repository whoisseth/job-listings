/** @format */

"use client";
/** @format */

import Image from "next/image";

import bgHeaderDesktop from "@/assets/images/bg-header-desktop.svg";
import bgHeaderMobile from "@/assets/images/bg-header-mobile.svg";
import JobCard, { JobType } from "@/components/JobCard";
import { IoCloseSharp } from "react-icons/io5";
import { useState, useEffect } from "react";
import { useAutoAnimate } from "@formkit/auto-animate/react";

import data from "@/assets/data.json";

export default function Home() {
  const [animationParent] = useAutoAnimate();
  const [activeTags, setActiveTags] = useState<string[]>([]);
  const [fiterData, setFilterData] = useState<JobType[]>(data);

  useEffect(() => {
    const newFitlerData =
      activeTags.length > 0
        ? data.filter(
            (item) =>
              item.languages.some((t) => activeTags.includes(t)) ||
              item.tools.some((t) => activeTags.includes(t))
          )
        : data;
    setFilterData(newFitlerData);
  }, [activeTags]);

  console.log("activeTags", activeTags);
  // html
  function handleClick(tag: string) {
    if (!activeTags.includes(tag)) {
      setActiveTags([...activeTags, tag]);
    } else {
      // ['html','css','python']
      // html

      // const updatedTags = activeTags.filter((t) => t !== tag);
      const updatedTags = activeTags.filter((t) => t !== tag);
      // html === html ✔️
      // js === html  ❌
      // python === html  ❌

      // html === html  ❌
      // js === html  ✔️
      // python === html  ✔️

      setActiveTags(updatedTags);
    }
  }

  function handleClose(tag: string) {
    const updatedTags = activeTags.filter((t) => t !== tag);

    setActiveTags(updatedTags);
  }

  function handleClear() {
    setActiveTags([]);
  }
  return (
    <div className="min-h-screen w-full  bg-[hsl(180,52%,96%)] flex-col flex gap-12">
      <div className="w-full bg-[hsl(180,29%,50%)]">
        <Image
          className="w-full md:hidden "
          src={bgHeaderMobile}
          alt="bg-header-desktop"
        />
        <Image
          className="w-full hidden md:flex"
          src={bgHeaderDesktop}
          alt="bg-header-desktop"
        />
      </div>

      {/*  */}
      <section className=" px-6 pb-8">
        <main
          ref={animationParent}
          className="h-full w-full flex-col flex items-center gap-10  md:gap-5  mx-auto max-w-[950px] relative  "
        >
          {/* filter container */}

          {activeTags.length > 0 && (
            <div className="bg-white shadow-lg w-full py-4 px-6 rounded-md absolute top-[-80px] flex justify-between">
              {/* filters */}
              <div ref={animationParent} className="flex gap-3 flex-wrap">
                {activeTags.map((d, i) => (
                  <button
                    key={i}
                    className="flex  items-center rounded overflow-hidden "
                    // key={i}
                  >
                    {/* {d} */}

                    <p className="text-desaturated-cyan  bg-[hsl(180,52%,96%)] px-2 py-0.5  font-bold  text-sm">
                      {d}
                    </p>
                    <div
                      onClick={() => handleClose(d)}
                      className="bg-desaturated-cyan hover:bg-slate-800 text-white px-2 py-1"
                    >
                      <IoCloseSharp />
                    </div>
                  </button>
                ))}
              </div>

              <button
                onClick={handleClear}
                className="text-sm font-semibold text-gray-500 hover:text-desaturated-cyan hover:underline "
              >
                Clear
              </button>
            </div>
          )}
          {/* card component */}
          {fiterData.map((d, i) => (
            <JobCard
              activeTags={activeTags}
              handleClick={handleClick}
              key={i}
              company={d.company}
              contract={d.contract}
              featured
              id={d.id}
              level={d.level}
              location={d.location}
              logo={d.logo}
              new={d.new}
              position={d.position}
              postedAt={d.postedAt}
              role={d.role}
              languages={d.languages}
              tools={d.tools}
            />
          ))}
        </main>
      </section>
    </div>
  );
}
