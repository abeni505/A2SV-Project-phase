import { MdLocationPin } from "react-icons/md";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { MdNotStarted } from "react-icons/md";
import { IoIosAddCircle } from "react-icons/io";
import { FaFireFlameCurved } from "react-icons/fa6";
import { FaCalendarCheck } from "react-icons/fa";
import { JobType } from "@/types/job";
import { TiTick } from "react-icons/ti";


import data from "@/Data/jobs.json";
const jobs: JobType[] = data.data;


const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

const dashboard = ({ params }: { params: { id: number } }) => {
    const job = jobs[params.id]
  const responsibilities = job.responsibilities
    .split(".")
    .map((s) => s.trim())
    .filter((s) => s.length > 0);
  return (
    <div className="body flex">
      <div className="left-items p-11 pt-16 w-3/4 pr-9">
        <div className="font-extrabold text-2xl text-blue-950 font-sans">
          Description
        </div>
        <div className="description pt-3 pb-8"> {job.description}</div>
        <div className="font-extrabold text-2xl text-blue-950 font-sans">
          Responsibilites
        </div>
        <ul className=" description pb-8">
          {responsibilities.map((res) => (
            <li>
              <TiTick className=" inline text-green-500" />
              {res}.
            </li>
          ))}
        </ul>
        <div className="font-extrabold text-2xl text-blue-950 font-sans">
          Ideal Candidate We Want
        </div>
        <div className="IdealCandidate pb-8"> {job.idealCandidate}</div>
        <div className="font-extrabold text-2xl text-blue-950 font-sans">
          When & Where
        </div>
        <div className="flex">
          <div className="flex items-center">
            <HiOutlineLocationMarker className="text-2xl text-blue-500 align-top" />
          </div>
          <div className="WhenAndWhere p-3"> {job.whenAndWhere}</div>
        </div>
      </div>

      <div className="right-items divide-y-2">
        <div className="Top">
          <div className="font-extrabold text-2xl text-blue-950 font-sans pt-5">
            About
          </div>

          <div className="PostedOn flex pt-3 pb-4">
            <div className=" flex items-center">
              <IoIosAddCircle className="text-3xl align-middle" />
            </div>
            <div className="right-part">
              <div className="text-gray-500 pl-3">Posted on</div>
              <div className="pl-3">{formatDate(job.startDate)}</div>
            </div>
          </div>
          <div className="deadline flex pb-4">
            <div className=" flex items-center">
              <FaFireFlameCurved className="text-3xl align-middle" />
            </div>
            <div className="right-part ">
              <div className="text-gray-500 pl-3">Deadline</div>
              <div className="pl-3">{formatDate(job.deadline)}</div>
            </div>
          </div>
          <div className="location flex pb-4">
            <div className=" flex items-center">
              <MdLocationPin className="text-3xl align-middle" />
            </div>
            <div className="right-part">
              <div className="text-gray-500 pl-3">Location</div>
              <div className="pl-3">{job.location}</div>
            </div>
          </div>
          <div className="startDate flex pb-4">
            <div className=" flex items-center">
              <MdNotStarted className="text-3xl align-middle" />
            </div>
            <div className="right-part">
              <div className="text-gray-500 pl-3">Start Date</div>
              <div className="pl-3">{formatDate(job.startDate)}</div>
            </div>
          </div>
          <div className="EndDate flex pb-4">
            <div className=" flex items-center">
              <FaCalendarCheck className="text-3xl align-middle" />
            </div>
            <div className="right-part">
              <div className="text-gray-500 pl-3">End Date</div>
              <div className="pl-3">{formatDate(job.endDate)}</div>
            </div>
          </div>
        </div>

        <div className="middle">
          <div className="font-extrabold text-2xl text-blue-950 font-sans">
            Categories
          </div>

          <div className="flex flex-wrap ">
            {job.categories.map((category, index) => (
              <div
                key={index}
                className="categorie ml-3 border bg-orange-200 rounded-full text-orange-500 p-2 m-1 "
              >
                {category}
              </div>
            ))}
          </div>
        </div>

        <div className="bottom">
          <div className="font-extrabold text-2xl text-blue-950 font-sans">
            Required Skills
          </div>

          <div className="categorie ml-3 border bg-purple-100 rounded-full text-purple-950 p-2 m-1">
            {job.requiredSkills}
          </div>
        </div>
      </div>
    </div>
  );
};

export default dashboard;
