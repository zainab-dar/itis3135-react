import React, { useState, useEffect } from "react";
import studentsData from "./students.json";
import './styles/default.css';

const Students = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    setStudents(studentsData); // load JSON directly
  }, []);

  return (
    <div>
  <h2>Student Introductions</h2>
  <div className="student-list">
    {students.map((student) => (
      <div key={student.email} className="student-card">
        <h3>
          {student.firstName} {student.lastName}{" "}
          {student.nickname && `(${student.nickname})`}
        </h3>

        <p>
          <strong>Mascot:</strong> {student.mascotAdj} | {student.mascotAnimal}
        </p>

        {student.picture && (
          <figure>
            <img src={student.picture} alt={student.caption || "Profile"} />
            <figcaption>{student.caption}</figcaption>
          </figure>
        )}

        <p>
          <strong>Personal Statement:</strong> {student.personalStatement}
        </p>

        <h4>Courses:</h4>
        <ul>
          {student.courses &&
            student.courses.map((course, index) => (
              <li key={index}>
                {course.department} {course.number}: {course.name} — {course.reason}
              </li>
            ))}
        </ul>

        {student.quote && (
          <p>
            <strong>Quote:</strong> "{student.quote.text}" — {student.quote.author}
          </p>
        )}
      </div>
    ))}
  </div>
</div>

  );
};

export default Students;