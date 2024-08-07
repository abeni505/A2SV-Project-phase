import Image from "next/image";
import JobCard from "./components/jobCard";
import { JobType } from "@/types/job";
import { FaAngleDown } from "react-icons/fa6";
import { apiResponse } from "@/types/apiResponse";

// const jobs: JobType[] = data.data;

// simple fetcher function without error handling
// async function fetcher(id: string): Promise<apiResponse<JobType>> {
//   const data: Response = await fetch(
//     "https://akil-backend.onrender.com/opportunities/" + id
//   );
//   return data.json();
// }

//fetcher function
async function fetcher<T>(url: string): Promise<T> {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: T = await response.json();
    return data;
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
}

export default async function Home() {
  try {
    const jobsResponse = await fetcher<apiResponse<JobType[]>>(
      "https://akil-backend.onrender.com/opportunities/search"
    );
    const jobs = jobsResponse.data;

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
  } catch (error) {
    console.error("Error fetching job listings:", error);
    return (
      <>
        <nav className="flex justify-between pl-20 pr-52 pt-10">
          <div className="left-items">
            <div className="font-extrabold text-2xl text-blue-950 font-sans">
              Opportunities
            </div>
            <div className="text-gray-500">Unable to load job listings.</div>
          </div>
        </nav>
        <main className="pl-20 pr-52 pt-10">
          <div className="error-message p-10">
            <p>Failed to load job listings. Please try again later.</p>
          </div>
        </main>
      </>
    );
  }
}
