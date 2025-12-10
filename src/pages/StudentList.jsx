import React, { useState, useEffect, useMemo } from 'react';

const initialFilterCriteria = {
    name: true,
    mascot: true,
    image: true,
    personalStatement: true,
    backgrounds: true,
    classes: true,
    extraInfo: true,
    quote: true,
    links: true,
};

function StudentList() {
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentStudentIndex, setCurrentStudentIndex] = useState(0);
    const [filterCriteria, setFilterCriteria] = useState(initialFilterCriteria);

    useEffect(() => {
        fetch('https://dvonb.xyz/api/2025-fall/itis-3135/students?full=1')
            .then(response => response.json())
            .then(data => {
                setStudents(data.filter(s => s && s.name));
                setLoading(false);
            })
            .catch(err => {
                setError(err.message);
                setLoading(false);
            });
    }, []);

    const getStudentName = (student) => {
        if (!student || !student.name) return "Anonymous";
        if (typeof student.name === 'object') {
            return `${student.name.first || ""} ${student.name.last || ""}`.trim();
        }
        return student.name;
    };

    const visibleStudents = useMemo(() => {
        const term = searchTerm.toLowerCase();
        const filtered = students.filter(student =>
            getStudentName(student).toLowerCase().includes(term)
        );

        if (filtered.length <= currentStudentIndex) {
            setCurrentStudentIndex(0);
        }

        return filtered;
    }, [students, searchTerm]);

    const currentStudent = visibleStudents[currentStudentIndex];
    const studentCount = visibleStudents.length;

    if (error) {
        return (
            <main style={{ padding: "20px", color: "#6B4226", backgroundColor: "#F6EFE6" }}>
                <h2>Error Loading Students</h2>
                <p>{error}</p>
                <button onClick={() => window.location.reload()}>Try Again</button>
            </main>
        );
    }

    if (loading) {
        return (
            <main style={{ padding: "20px", backgroundColor: "#F6EFE6", color: "#6B4226" }}>
                <p>Loading student data...</p>
            </main>
        );
    }

    return (
        <main style={{ padding: "20px", backgroundColor: "#F6EFE6", color: "#4A3A31", minHeight: "100vh" }}>
            <h2 style={{ color: "#6B4226" }}>Student Introductions Slideshow 🎓</h2>

            {/* SEARCH & COUNT */}
            <div style={{ marginBottom: "20px", padding: "15px", border: "1px solid #D2B89C", borderRadius: "8px" }}>
                <h3 style={{ marginTop: 0, color: "#6B4226" }}>Search & Count</h3>

                <p>
                    Students Found: <b>{studentCount}</b>
                    {studentCount > 0 && (
                        <span style={{ marginLeft: "10px", fontSize: "0.9em", color: "#8A7665" }}>
                            (Showing {currentStudentIndex + 1} of {studentCount})
                        </span>
                    )}
                </p>

                <input
                    type="text"
                    placeholder="Search students by name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{
                        padding: "10px",
                        width: "100%",
                        maxWidth: "400px",
                        borderRadius: "5px",
                        border: "1px solid #BFA387",
                        backgroundColor: "#FFF8F0",
                        color: "#4A3A31"
                    }}
                />
            </div>

            {/* DISPLAY FILTERS */}
            <div style={{ marginBottom: "20px", padding: "15px", border: "1px solid #D2B89C", borderRadius: "8px" }}>
                <h3 style={{ marginTop: 0, color: "#6B4226" }}>Display Filters</h3>

                <div style={{ display: "flex", flexWrap: "wrap", gap: "15px" }}>
                    {Object.keys(initialFilterCriteria).map(key => (
                        <label key={key} style={{ cursor: "pointer" }}>
                            <input
                                type="checkbox"
                                checked={filterCriteria[key]}
                                onChange={() =>
                                    setFilterCriteria(prev => ({ ...prev, [key]: !prev[key] }))
                                }
                                style={{ marginRight: "6px" }}
                            />
                            {key}
                        </label>
                    ))}
                </div>
            </div>

            {/* STUDENT CARD */}
            <div style={{ textAlign: "center" }}>
                {studentCount > 0 ? (
                    <div style={{
                        border: "1px solid #C9B6A1",
                        padding: "20px",
                        borderRadius: "12px",
                        margin: "20px auto",
                        maxWidth: "650px",
                        backgroundColor: "#FFF8F0",
                        boxShadow: "0 3px 7px rgba(125, 95, 70, 0.25)",
                        textAlign: "left"
                    }}>
                        {/* NAME */}
                        {filterCriteria.name && (
                            <h3 style={{ color: "#6B4226", marginTop: 0, textAlign: "center" }}>
                                {getStudentName(currentStudent)}
                            </h3>
                        )}

                        {/* IMAGE */}
                        {filterCriteria.image && currentStudent.media?.src && (
                            <div style={{ textAlign: "center", marginBottom: "15px" }}>
                                <img
                                    src={`https://dvonb.xyz${currentStudent.media.src}`}
                                    alt=""
                                    style={{
                                        maxWidth: "100%",
                                        borderRadius: "10px",
                                        border: "1px solid #DAC6AF"
                                    }}
                                />
                            </div>
                        )}

                        {/* MASCOT */}
                        {filterCriteria.mascot && currentStudent.mascot && (
                            <p><strong>Mascot:</strong> {currentStudent.mascot}</p>
                        )}

                        {/* PERSONAL STATEMENT */}
                        {filterCriteria.personalStatement && (
                            <>
                                <p><strong>Personal Statement:</strong></p>
                                <p>{currentStudent.personalStatement}</p>
                            </>
                        )}

                        {/* QUOTE */}
                        {filterCriteria.quote && currentStudent.quote?.text && (
                            <blockquote style={{
                                borderLeft: "4px solid #A17959",
                                paddingLeft: "10px",
                                color: "#6B4E3D",
                                fontStyle: "italic",
                                backgroundColor: "#F6EFE6"
                            }}>
                                "{currentStudent.quote.text}"
                                {currentStudent.quote.author && (
                                    <div style={{ fontSize: "0.8em" }}>— {currentStudent.quote.author}</div>
                                )}
                            </blockquote>
                        )}

                        {/* FUN FACT */}
                        {filterCriteria.extraInfo && currentStudent.funFact && (
                            <p><strong>Fun Fact:</strong> {currentStudent.funFact}</p>
                        )}
                    </div>
                ) : (
                    <p>No students found.</p>
                )}

                {/* BUTTONS */}
                <div style={{ marginTop: "20px" }}>
                    <button
                        onClick={() => setCurrentStudentIndex(i => (i - 1 + studentCount) % studentCount)}
                        disabled={studentCount <= 1}
                        style={buttonStyle}
                    >
                        &lt; Previous
                    </button>

                    <button
                        onClick={() => setCurrentStudentIndex(i => (i + 1) % studentCount)}
                        disabled={studentCount <= 1}
                        style={{ ...buttonStyle, marginLeft: "10px" }}
                    >
                        Next &gt;
                    </button>
                </div>
            </div>
        </main>
    );
}

const buttonStyle = {
    padding: "10px 20px",
    backgroundColor: "#A17959",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "600"
};

export default StudentList;