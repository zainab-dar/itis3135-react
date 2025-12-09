import React, { useState, useEffect } from "react";
import studentsData from "./students.json";
import "./styles/default.css";

const Students = () => {
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [slideIndex, setSlideIndex] = useState(0);

  const [filters, setFilters] = useState({
    name: true,
    mascot: true,
    image: true,
    personalStatement: true,
    courses: true,
    quote: true,
    extraInformation: true,
  });

  useEffect(() => {
    setStudents(studentsData);
  }, []);

  // Search filter
  const filtered = students.filter((student) => {
    const fullname = `${student.name?.first || ""} ${student.name?.last || ""}`.toLowerCase();
    return fullname.includes(searchTerm.toLowerCase());
  });

  // Keep slideshow index valid
  useEffect(() => {
    if (slideIndex >= filtered.length) {
      setSlideIndex(0);
    }
  }, [filtered.length, slideIndex]);

  const changeSlide = (direction) => {
    if (direction === "next") {
      setSlideIndex((prev) => (prev + 1) % filtered.length);
    } else {
      setSlideIndex((prev) => (prev - 1 + filtered.length) % filtered.length);
    }
  };

  const toggleFilter = (key) => {
    setFilters((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const currentStudent = filtered[slideIndex];

  return (
    <div>
      <h2>Student Introductions</h2>

      {/* Search Input */}
      <input
        type="text"
        placeholder="Search by first or last name..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ padding: "7px", marginBottom: "10px", width: "250px" }}
      />

      <p>
        Showing <strong>{filtered.length}</strong> student(s)
      </p>

      {/* Filter Options */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
        {Object.keys(filters).map((key) => (
          <label key={key}>
            <input
              type="checkbox"
              checked={filters[key]}
              onChange={() => toggleFilter(key)}
            />
            {" "}{key}
          </label>
        ))}
      </div>

      <hr />

      {/* Slideshow Navigation */}
      {filtered.length > 1 && (
        <div>
          <button onClick={() => changeSlide("prev")}>Previous</button>
          <button onClick={() => changeSlide("next")} style={{ marginLeft: "10px" }}>Next</button>
          <span style={{ marginLeft: "15px" }}>
            {slideIndex + 1} / {filtered.length}
          </span>
        </div>
      )}

      {/* Student Card */}
      {currentStudent && (
        <div className="student-card" style={{ border: "1px solid gray", padding: "10px" }}>
          
          {/* NAME */}
          {filters.name && (
            <h3>
              {currentStudent.name?.first} {currentStudent.name?.middleInitial} {currentStudent.name?.last}
            </h3>
          )}

          {/* MASCOT */}
          {filters.mascot && (
            <p><strong>Mascot:</strong> {currentStudent.mascot}</p>
          )}

          {/* IMAGE */}
          {filters.image && currentStudent.media?.hasImage && (
            <figure>
              <img
                src={currentStudent.media.src}
                alt={currentStudent.media.caption}
                style={{ width: "200px", borderRadius: "10px" }}
              />
              <figcaption>{currentStudent.media.caption}</figcaption>
            </figure>
          )}

          {/* PERSONAL STATEMENT */}
          {filters.personalStatement && (
            <p><strong>Personal Statement:</strong> {currentStudent.personalStatement}</p>
          )}

          {/* COURSES */}
          {filters.courses && currentStudent.courses && (
            <>
              <h4>Courses:</h4>
              <ul>
                {currentStudent.courses.map((course, index) => (
                  <li key={index}>
                    {course.dept} {course.num}: {course.name} — {course.reason}
                  </li>
                ))}
              </ul>
            </>
          )}

          {/* QUOTE */}
          {filters.quote && currentStudent.quote && (
            <p>
              <strong>Quote:</strong> "{currentStudent.quote.text}" — {currentStudent.quote.author}
            </p>
          )}

          {/* EXTRA INFO */}
          {filters.extraInformation && currentStudent.additional && (
            <p><strong>Extra Info:</strong> {currentStudent.additional}</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Students;