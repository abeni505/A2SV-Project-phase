"use client";
import Image from "next/image";
import { JobType } from "@/types/job";
import Link from "next/link";
import { link } from "fs";

const jobCard = ({ job, id }: { job: JobType; id: number }) => {
  return (
    <Link href={`/${job.id}`}>
      <div className="flex content-between p-5 border-2 border-gray-500 rounded-3xl m-1">
        <div className="img">
          <Image src={job.logoUrl} width={250} height={10} alt="Org Image" />
        </div>
        <div className="right-items pl-4">
          <div className="title text-xl font-bold pb-2">{job.title}</div>
          <div className="whenAndWhere text-gray-500 pb-2">
            {job.whenAndWhere}
          </div>
          <div className="description pb-3 tracking-wider">
            {job.description}
          </div>
          <div className="opTypeAndCategories flex  divide-x-2 divide-gray-500">
            <div className="opType bg-green-100 rounded-full text-green-500 p-3 mr-3">
              {job.opType}
            </div>

            <div className="flex flex-wrap ">
              {job.categories.map((category, index) => (
                <div
                  key={index}
                  className="categorie ml-3 border border-orange-500 rounded-full text-orange-500 p-2 m-1 "
                >
                  {category}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default jobCard;
