"use client";
interface courseCardProps {
  courses: Course[];
}
interface Course {
  _id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  chapter: { title: string }[];
  imageCover: string;
}

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BookOpen } from "lucide-react";
import { Clock4Icon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

const CourseCardWrapper = ({ courses }: courseCardProps) => {
  const pathname = usePathname();
  const isSearchPage = pathname.includes("/dashboard/search");
  const router = useRouter();
  const handleRedirect = (courseId: string) => {
    router.push(`/dashboard/search/${courseId}`);
  };

  return (
    <div className=" w-full pt-4">
      {isSearchPage ? (
        <></>
      ) : (
        <div className=" flex  max-sm:flex-col  max-sm:gap-y-2 justify-between items-center pr-16 pl-16  pb-2 w-full gap-x-8 md:gap-x-24 mb-4 ">
          <div className="flex-start flex justify-start items-center gap-x-2 basis-1/2 bg-[var(--sidebar)] max-sm:w-[300px] pl-4 pr-4  pt-4 pb-4 rounded-xl">
            <div className="w-[30px] h-[30px] flex justify-center  items-center bg-purple-200 rounded-full ">
              <Clock4Icon />{" "}
            </div>
            <div>
              <h1 className="font-bold text-xs md:text-sm lg:text-lg  text-[var(--textpur)]">
                In Progress
              </h1>
              <p className="text-sm text-gray-500">3 courses </p>
            </div>
          </div>

          <div className="flex-start flex justify-start items-center gap-x-2 basis-1/2 bg-green-100 pl-4 pr-4 pt-4 pb-4  max-sm:w-[300px] rounded-xl">
            <div className="w-[30px] h-[30px] flex justify-center items-center bg-green-200 rounded-full ">
              <Clock4Icon />{" "}
            </div>
            <div>
              <h1 className="font-bold text-xs md:text-sm lg:text-lg  text-[var(--textpur)]">
                Completed Courses
              </h1>
              <p className="text-sm text-gray-500">8 courses </p>
            </div>
          </div>
        </div>
      )}
      <div className=" grid xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 justify-items-center gap-4 ">
        {Array.isArray(courses) &&
          courses.map((course, index) => (
            <Card
              onClick={() => {
                handleRedirect(course._id);
              }}
              key={index}
              className="hover:cursor-pointer xl:w-[350px] lg:w-[250px] max-md:w-[300px] sm:w-[220px]"
            >
              <CardHeader className="w-full  p-0 mb-4">
                <img
                  src={`http://localhost:4000/uploads/${course.imageCover}`}
                  alt={course.title}
                  className="h-[200px] w-full object-cover rounded-md mb-4 "
                />
                <CardTitle className="pl-6 pr-6 font-bold text-xl text-[var(--textpur)]">
                  {course.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="flex gap-x-2 ">
                <BookOpen className="text-[var(--textpur)]" />
                {course.category}
              </CardContent>
              <CardFooter className="text-[var(--textpur)]">
                ${course.price}
              </CardFooter>
            </Card>
          ))}
      </div>
    </div>
  );
};

export default CourseCardWrapper;
