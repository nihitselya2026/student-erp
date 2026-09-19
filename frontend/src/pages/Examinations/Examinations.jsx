import {
  CalendarDays,
  Clock3,
  MapPin,
  BookOpen,
  FileText,
  Award,
} from "lucide-react";

import "./Examinations.css";

import { useEffect, useState } from "react";
import api from "../../services/api";

function Examinations() {
  /*
    Backend integration ready.

    Expected API response:

    {
      "examinations": [
        {
          "id": 1,
          "subject": "Subject Name",
          "examType": "Mid Examination",
          "examDate": "2026-09-10",
          "startTime": "10:00 AM",
          "endTime": "01:00 PM",
          "room": "Exam Hall - 1"
        }
      ],

      "results": [
        {
          "id": 1,
          "semester": "Semester 1",
          "subject": "Subject Name",
          "marks": 85,
          "grade": "A",
          "status": "PASS"
        }
      ]
    }

    No dummy data.
  */

  const [examinationData, setExaminationData] = useState(null);

  useEffect(() => {
  const fetchExaminations = async () => {
    try {
      const student = JSON.parse(localStorage.getItem("student"));

      if (!student?.studentId || !student?.semester) {
        return;
      }

  const response = await api.get(
  `/examinations/${student.studentId}/${student.semester}`
);

const examinations = response.data.map((exam) => ({
  ...exam,
  examType: exam.examName,
  startTime: exam.examTime,
  endTime: "",
}));

const resultsResponse = await api.get(
  `/exam-results/${student.studentId}/${student.semester}`
);

setExaminationData({
  examinations,
  results: resultsResponse.data,
});
    } catch (error) {
      console.error("Failed to load examinations:", error);
    }
  };

  fetchExaminations();
}, []);

  const examinations =
    examinationData?.examinations ?? [];

  const results =
    examinationData?.results ?? [];


  return (
    <div className="examinations-page">

      {/* ========================================
          Page Header
      ======================================== */}

      <div className="examinations-header">

        <div>
          <h1>Examinations</h1>

          <p>
            View your exam schedule and examination results.
          </p>
        </div>

        <div className="examinations-header-icon">
          <FileText size={22} />
        </div>

      </div>


      {/* ========================================
          Exam Schedule
      ======================================== */}

      <section className="examinations-card">

        <div className="examinations-card-header">

          <div className="examinations-title">

            <div className="examinations-title-icon">
              <CalendarDays size={19} />
            </div>

            <div>
              <h3>Exam Schedule</h3>

              <p>
                Upcoming and scheduled examinations.
              </p>
            </div>

          </div>

        </div>


        {examinations.length > 0 ? (

          <div className="exam-list">

            {examinations.map((exam) => (

              <div
                className="exam-item"
                key={exam.id}
              >

                {/* Subject */}

                <div className="exam-subject">

                  <div className="exam-subject-icon">
                    <BookOpen size={18} />
                  </div>

                  <div>
                    <h4>
                      {exam.subject}
                    </h4>

                    <span>
                      {exam.examType}
                    </span>
                  </div>

                </div>


                {/* Date */}

                <div className="exam-detail">

                  <CalendarDays size={15} />

                  <div>
                    <span>
                      Exam Date
                    </span>

                    <strong>
                      {exam.examDate}
                    </strong>
                  </div>

                </div>


                {/* Time */}

                <div className="exam-detail">

                  <Clock3 size={15} />

                  <div>
                    <span>
                      Time
                    </span>

                    <strong>
                  {exam.startTime}
                </strong>
                  </div>

                </div>


                {/* Room */}

                <div className="exam-detail">

                  <MapPin size={15} />

                  <div>
                    <span>
                      Room
                    </span>

                    <strong>
                      {exam.room}
                    </strong>
                  </div>

                </div>

              </div>

            ))}

          </div>

        ) : (

          <div className="examinations-empty">

            <div className="examinations-empty-icon">
              <CalendarDays size={27} />
            </div>

            <h4>
              No exam schedule available
            </h4>

            <p>
              Your examination schedule will appear here
              once it is provided by the college.
            </p>

          </div>

        )}

      </section>


      {/* ========================================
          Examination Results
      ======================================== */}

      <section className="examinations-card results-card">

        <div className="examinations-card-header">

          <div className="examinations-title">

            <div className="results-title-icon">
              <Award size={19} />
            </div>

            <div>
              <h3>Examination Results</h3>

              <p>
                View your marks and grades.
              </p>
            </div>

          </div>

        </div>


        {results.length > 0 ? (

          <div className="results-table-wrapper">

            <table className="results-table">

              <thead>
                <tr>
                  <th>Semester</th>
                  <th>Subject</th>
                  <th>Marks</th>
                  <th>Grade</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>

                {results.map((result) => (

                  <tr key={result.id}>

                    <td>
                      {result.semester}
                    </td>

                    <td>
                      <div className="result-subject">
                        <BookOpen size={15} />

                        <span>
                          {result.subject}
                        </span>
                      </div>
                    </td>

                    <td>
                      {result.marks ?? "--"}
                    </td>

                    <td>
                      <span className="grade-badge">
                        {result.grade ?? "--"}
                      </span>
                    </td>

                    <td>
                      <span
                        className={
                          result.status?.toUpperCase() ===
                          "PASS"
                            ? "result-pass"
                            : "result-status"
                        }
                      >
                        {result.status ?? "--"}
                      </span>
                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        ) : (

          <div className="results-empty">

            <div className="results-empty-icon">
              <Award size={27} />
            </div>

            <h4>
              No examination results available
            </h4>

            <p>
              Your marks and grades will appear here
              once examination results are published.
            </p>

          </div>

        )}

      </section>

    </div>
  );
}

export default Examinations;