"use client";
import CourseCardWrapper from "@/components/courses/courses";
import { useEffect, useState } from "react";

interface Course {
  _id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  chapter: { title: string }[];
  imageCover: string;
}

const CoursesPage = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        const response = await fetch(
          `https://lms-mern-stack-server.vercel.app/api/courses/?limit=50`
        );
        if (!response.ok) throw new Error("Failed to fetch course data");

        const result = await response.json();
        const courseData = result.data.data || [];
        setCourses(courseData);
      } catch (error) {
        console.error("Error fetching course data:", error);
      }
    };
    fetchCourseData();
  }, []);

  useEffect(() => {
    const filtered = courses.filter((course) =>
      course.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCourses(filtered);
  }, [searchTerm, courses]);

  console.log("Courses state:", courses);
  console.log("Filtered courses state:", filteredCourses);

  return (
    <div className="m-auto ">
      <CourseCardWrapper courses={filteredCourses} />
    </div>
  );
};

export default CoursesPage;
