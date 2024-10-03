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
import { Button } from "../ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";

const CourseCardWrapper = ({ courses }: courseCardProps) => {
  const router = useRouter();
  const handleRedirect = (courseId: string) => {
    router.push(`/teacher/courses/${courseId}`);
  };

  return (
    <div className=" w-full pt-4">
      <div className="pl-10 mb-4">
        <Link href="/teacher/create">
          <Button className=" text-[var(--text)] bg-[var(--textpur)] hover:bg-[var(--textpur)] ">
            Create New Course
          </Button>
        </Link>
      </div>

      <div className=" grid xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 justify-items-center gap-4 ">
        {Array.isArray(courses) &&
          courses.map((course, index) => (
            <Card
              onClick={() => {
                handleRedirect(course._id);
              }}
              key={index}
              className=" xl:w-[350px] lg:w-[250px] max-md:w-[300px] sm:w-[220px] hover:cursor-pointer"
            >
              <CardHeader className=" w-full  p-0 mb-4">
                <img
                  src={`http://localhost:4000/uploads/${course.imageCover}`}
                  alt={course.title}
                  className="  object-cover rounded-md w-full"
                />
                <CardTitle className="pl-6 pr-6 font-bold text-xl text-[var(--textpur)]">
                  {course.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="flex gap-x-2 ">
                <BookOpen className="text-[var(--textpur)]" />7 chapters
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
