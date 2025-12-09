import React, { useState, useEffect } from "react";
import studentData from "./StudentList.json";
import "./styles/default.css";

const Students = () => {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
  setStudents(studentData);
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

      {student.media?.hasImage && (
        <img
          src={student.media.src}
          alt={student.name.first}
          className="student-img"
        />
      )}

      <h2>
        {student.name.first} {student.name.last}
      </h2>

      <p><strong>Mascot:</strong> {student.mascot}</p>

      <p>
        <strong>Personal Statement:</strong><br />
        {student.personalStatement}
      </p>

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

      {student.quote && (
        <p className="quote">
          “{student.quote.text}” — {student.quote.author}
        </p>
      )}

      <p><strong>Fun Fact:</strong> {student.funFact}</p>

      <p><strong>Additional Info:</strong> {student.additional}</p>

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

export default StudentList;