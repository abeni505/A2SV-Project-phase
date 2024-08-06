import Image from "next/image";
import JobCard from "./components/jobCard";
import { JobType } from "@/types/job";
import data from "@/Data/jobs.json";
import { FaAngleDown } from "react-icons/fa6";

const jobs: JobType[] = data.data;

export default function Home() {
  return (
    <>
      <nav className="flex justify-between pl-20 pr-52 pt-10">
        <div className="left-items">
          <div className="font-extrabold text-2xl text-blue-950 font-sans">
            Opportunities
          </div>
          <div className="text-gray-500 ">Showing {jobs.length} results</div>
        </div>
        <div className="right p-4  border-r-gray-300 border-r-2">
          <div className="text-gray-500  inline">Sort by :</div>
          <div className="inline  pl-3 pr-3">Most relevant </div>
          <FaAngleDown className="inline" />
        </div>
      </nav>
      <main className="pl-20 pr-52 pt-10">
        {jobs.map((job, index) => (
          <JobCard job={job} id={index} />
        ))}
      </main>
    </>
  );
}
