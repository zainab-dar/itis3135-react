import React, { useState, useEffect } from "react";
import studentsData from "./StudentList.json";
import "./styles/default.css";

const Students = () => {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    setStudents(studentsData);
    setFilteredStudents(studentsData);
  }, []);

  const handleSearch = (value) => {
    setSearchTerm(value);

    const filtered = students.filter((student) =>
      student.name.toLowerCase().includes(value.toLowerCase())
    );

    setFilteredStudents(filtered);
  };

  return (
   <div className="students-list">
  {filteredStudents.map((student) => (
    <div key={student.prefix} className="student-card">

      {/* IMAGE */}
      {student.media?.hasImage && (
        <img
          src={student.media.src}
          alt={student.name.first}
          className="student-img"
        />
      )}

      {/* NAME */}
      <h2>
        {student.name.first} {student.name.last}
      </h2>

      {/* MASCOT */}
      <p><strong>Mascot:</strong> {student.mascot}</p>

      {/* PERSONAL STATEMENT */}
      <p>
        <strong>Personal Statement:</strong><br />
        {student.personalStatement}
      </p>

      {/* BACKGROUND SECTIONS */}
      <div className="background-section">
        <strong>Personal Background:</strong>
        <p>{student.backgrounds.personal}</p>

        <strong>Professional Background:</strong>
        <p>{student.backgrounds.professional}</p>

        <strong>Academic Background:</strong>
        <p>{student.backgrounds.academic}</p>

        <strong>Subject Interest:</strong>
        <p>{student.backgrounds.subject}</p>
      </div>

      {/* COURSES */}
      <div>
        <strong>Courses This Semester:</strong>
        <ul>
          {student.courses.map((course) => (
            <li key={course.code}>
              {course.code} — {course.name}
              <br />
              <small><em>{course.reason}</em></small>
            </li>
          ))}
        </ul>
      </div>

      {/* QUOTE */}
      {student.quote && (
        <p className="quote">
          “{student.quote.text}” — {student.quote.author}
        </p>
      )}

      {/* FUN FACT */}
      <p><strong>Fun Fact:</strong> {student.funFact}</p>

      {/* EXTRA INFORMATION */}
      <p><strong>Additional Info:</strong> {student.additional}</p>

      {/* LINKS */}
      <div className="links">
        <strong>Links:</strong>
        <ul>
          {Object.entries(student.links).map(([label, url]) => (
            <li key={label}>
              <a href={url} target="_blank" rel="noopener noreferrer">
                {label.toUpperCase()}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  ))}

  {filteredStudents.length === 0 && (
    <p className="no-results">No matching students found.</p>
  )}
</div>

  );
};

export default Students;