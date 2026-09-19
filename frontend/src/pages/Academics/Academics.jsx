import {
  BookOpen,
  GraduationCap,
  TrendingUp,
  Award,
  FileText,
} from "lucide-react";
import { useEffect, useState } from "react";
import api from "../../services/api";

import "./Academics.css";

function Academics() {
  /*
    Backend integration ready structure.

    Backend nunchi actual academic data vachina tarvata
    ee object ni API response tho replace chestam.

    No dummy student data.
  */
  const [academicData, setAcademicData] = useState(null);
    useEffect(() => {
    const fetchAcademicData = async () => {
      try {
        const student = JSON.parse(localStorage.getItem("student"));

        if (!student?.studentId) {
          return;
        }

        const studentId = student.studentId;
        const semester = student.semester;

        const [academicsResponse, subjectsResponse] =
          await Promise.all([
            api.get(`/academics/${studentId}`),
            api.get(`/academic-subjects/${studentId}/${semester}`),
          ]);

        const academics = academicsResponse.data;
        const subjectsData = subjectsResponse.data;

        const currentAcademic = academics.find(
          (item) => item.semester === semester
        );

        const subjects = subjectsData.map((subject) => ({
          id: subject.id,
          name: subject.subjectName,
          code: subject.subjectCode,
          credits: "--",
          internalMarks: "--",
          marks: subject.marks,
          grade: subject.grade,
        }));

        setAcademicData({
          currentSemester: semester,
          sgpa: currentAcademic?.sgpa ?? null,
          cgpa: currentAcademic?.cgpa ?? null,
          subjects,
          semesterResults: academics.map((item) => ({
            id: item.id,
            semester: item.semester,
            sgpa: item.sgpa,
            credits: "--",
            status: "Completed",
          })),
        });
      } catch (error) {
        console.error("Failed to load academic data:", error);
      }
    };

    fetchAcademicData();
  }, []);

  const subjects = academicData?.subjects ?? [];
  const semesterResults = academicData?.semesterResults ?? [];

  return (
    <div className="academics-page">

      {/* ========================================
          Page Header
      ======================================== */}

      <div className="academics-header">
        <div>
          <h1>Academics</h1>

          <p>
            View your subjects, marks, and academic performance.
          </p>
        </div>
      </div>


      {/* ========================================
          Academic Summary
      ======================================== */}

      <div className="academic-summary">

        {/* Current Semester */}

        <div className="academic-summary-card">

          <div className="academic-summary-icon semester">
            <GraduationCap size={23} />
          </div>

          <div>
            <span>Current Semester</span>

            <strong>
              {academicData?.currentSemester ?? "--"}
            </strong>
          </div>

        </div>


        {/* SGPA */}

        <div className="academic-summary-card">

          <div className="academic-summary-icon sgpa">
            <TrendingUp size={23} />
          </div>

          <div>
            <span>Current SGPA</span>

            <strong>
              {academicData?.sgpa ?? "--"}
            </strong>
          </div>

        </div>


        {/* CGPA */}

        <div className="academic-summary-card">

          <div className="academic-summary-icon cgpa">
            <Award size={23} />
          </div>

          <div>
            <span>Overall CGPA</span>

            <strong>
              {academicData?.cgpa ?? "--"}
            </strong>
          </div>

        </div>

      </div>


      {/* ========================================
          Subjects
      ======================================== */}

      <section className="academics-card">

        <div className="academics-card-header">

          <div className="academics-card-title">

            <div className="academics-title-icon">
              <BookOpen size={19} />
            </div>

            <div>
              <h3>Subjects</h3>

              <p>
                Current semester subjects and marks
              </p>
            </div>

          </div>

        </div>


        {subjects.length > 0 ? (

          <div className="subjects-table-wrapper">

            <table className="subjects-table">

              <thead>
                <tr>
                  <th>Subject</th>
                  <th>Code</th>
                  <th>Credits</th>
                  <th>Internal</th>
                  <th>Marks</th>
                  <th>Grade</th>
                </tr>
              </thead>

              <tbody>

                {subjects.map((subject) => (

                  <tr key={subject.id}>

                    <td>
                      {subject.name}
                    </td>

                    <td>
                      {subject.code}
                    </td>

                    <td>
                      {subject.credits}
                    </td>

                    <td>
                      {subject.internalMarks}
                    </td>

                    <td>
                      {subject.marks}
                    </td>

                    <td>
                      {subject.grade}
                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        ) : (

          <div className="academics-empty-state">

            <div className="academics-empty-icon">
              <BookOpen size={23} />
            </div>

            <h4>
              No subject data available
            </h4>

            <p>
              Subject information will appear here
              once it is available.
            </p>

          </div>

        )}

      </section>


      {/* ========================================
          Semester Results
      ======================================== */}

      <section className="academics-card">

        <div className="academics-card-header">

          <div className="academics-card-title">

            <div className="academics-title-icon result-icon">
              <FileText size={19} />
            </div>

            <div>
              <h3>Semester Results</h3>

              <p>
                Your semester-wise academic performance
              </p>
            </div>

          </div>

        </div>


        {semesterResults.length > 0 ? (

          <div className="semester-results">

            {semesterResults.map((result) => (

              <div
                className="semester-result-row"
                key={result.id}
              >

                <div className="semester-result-name">
                  <span>
                    Semester
                  </span>

                  <strong>
                    {result.semester}
                  </strong>
                </div>

                <div>
                  <span>SGPA</span>

                  <strong>
                    {result.sgpa}
                  </strong>
                </div>

                <div>
                  <span>Credits</span>

                  <strong>
                    {result.credits}
                  </strong>
                </div>

                <div>
                  <span>Status</span>

                  <strong>
                    {result.status}
                  </strong>
                </div>

              </div>

            ))}

          </div>

        ) : (

          <div className="academics-empty-state">

            <div className="academics-empty-icon result-empty-icon">
              <FileText size={23} />
            </div>

            <h4>
              No semester results available
            </h4>

            <p>
              Your semester results will appear here
              once they are provided by the college.
            </p>

          </div>

        )}

      </section>

    </div>
  );
}

export default Academics;