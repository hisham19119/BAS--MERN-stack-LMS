"use client";
import CourseCardWrapper from "@/components/browse/course-card";
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

interface Category {
  _id: string;
  title: string;
}

function dashboardPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        const response = await fetch(
          `https://lms-mern-stack-server.vercel.app/api/courses/?limit=1000`
        );
        if (!response.ok) throw new Error("Failed to fetch course data");

        const result = await response.json();
        const courseData = result.data.data || [];
        setCourses(courseData);
      } catch (error) {
        console.error("Error fetching course data:", error);
      }
    };

    const fetchCategoryData = async () => {
      try {
        const response = await fetch(
          `https://lms-mern-stack-server.vercel.app/api/categories?limit=1000`
        );
        if (!response.ok) throw new Error("Failed to fetch category data");

        const result = await response.json();
        const categoryData = result.data.data || [];
        setCategories(categoryData);
      } catch (error) {
        console.error("Error fetching category data:", error);
      }
    };

    fetchCourseData();
    fetchCategoryData();
  }, []);

  useEffect(() => {
    const filtered = courses.filter((course) =>
      course.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCourses(filtered);
  }, [searchTerm, courses]);

  const categoryMap = Object.fromEntries(
    categories.map((category) => [category._id, category.title])
  );

  const preparedCourses = filteredCourses.map((course) => ({
    ...course,
    category: categoryMap[course.category] || "Unknown Category",
  }));

  return (
    <div className="m-auto ">
      <CourseCardWrapper courses={preparedCourses} />
    </div>
  );
}
export default dashboardPage;
