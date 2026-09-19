import {
  ClipboardList,
  CalendarDays,
  BookOpen,
  Clock3,
  CheckCircle2,
  AlertCircle,
  FileText,
} from "lucide-react";
import { useEffect, useState } from "react";
import api from "../../services/api";

import "./Assignments.css";

function Assignments() {
  /*
    Backend integration ready.

    Expected backend response:

    {
      "assignments": [
        {
          "id": 1,
          "title": "Assignment Title",
          "subject": "Subject Name",
          "description": "Assignment description",
          "dueDate": "2026-09-10",
          "status": "PENDING"
        }
      ]
    }

    No dummy data.
  */

 const [assignmentsData, setAssignmentsData] = useState(null);
   useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const student = JSON.parse(localStorage.getItem("student"));

        if (!student?.studentId || !student?.semester) {
          return;
        }

        const response = await api.get(
          `/assignments/${student.studentId}/${student.semester}`
        );

        setAssignmentsData({
          assignments: response.data,
        });
      } catch (error) {
        console.error("Failed to load assignments:", error);
      }
    };

    fetchAssignments();
  }, []);

  const assignments = assignmentsData?.assignments ?? [];

  const pendingAssignments = assignments.filter(
    (assignment) =>
      assignment?.status?.toUpperCase() === "PENDING"
  );

  const submittedAssignments = assignments.filter(
    (assignment) =>
      assignment?.status?.toUpperCase() === "SUBMITTED"
  );

  const overdueAssignments = assignments.filter(
    (assignment) =>
      assignment?.status?.toUpperCase() === "OVERDUE"
  );

  const getStatusClass = (status) => {
    switch (status?.toUpperCase()) {
      case "SUBMITTED":
        return "status-submitted";

      case "OVERDUE":
        return "status-overdue";

      case "PENDING":
        return "status-pending";

      default:
        return "status-default";
    }
  };

  const getStatusIcon = (status) => {
    switch (status?.toUpperCase()) {
      case "SUBMITTED":
        return <CheckCircle2 size={14} />;

      case "OVERDUE":
        return <AlertCircle size={14} />;

      case "PENDING":
        return <Clock3 size={14} />;

      default:
        return <FileText size={14} />;
    }
  };

  return (
    <div className="assignments-page">

      {/* ========================================
          Header
      ======================================== */}

      <div className="assignments-header">

        <div>
          <h1>Assignments</h1>

          <p>
            Track your assignments and submission status.
          </p>
        </div>

        <div className="assignments-header-icon">
          <ClipboardList size={22} />
        </div>

      </div>


      {/* ========================================
          Statistics
      ======================================== */}

      <div className="assignment-stats">

        <div className="assignment-stat-card">

          <div className="assignment-stat-icon total">
            <ClipboardList size={19} />
          </div>

          <div>
            <span>Total Assignments</span>

            <strong>
              {assignmentsData
                ? assignments.length
                : "--"}
            </strong>
          </div>

        </div>


        <div className="assignment-stat-card">

          <div className="assignment-stat-icon pending">
            <Clock3 size={19} />
          </div>

          <div>
            <span>Pending</span>

            <strong>
              {assignmentsData
                ? pendingAssignments.length
                : "--"}
            </strong>
          </div>

        </div>


        <div className="assignment-stat-card">

          <div className="assignment-stat-icon submitted">
            <CheckCircle2 size={19} />
          </div>

          <div>
            <span>Submitted</span>

            <strong>
              {assignmentsData
                ? submittedAssignments.length
                : "--"}
            </strong>
          </div>

        </div>


        <div className="assignment-stat-card">

          <div className="assignment-stat-icon overdue">
            <AlertCircle size={19} />
          </div>

          <div>
            <span>Overdue</span>

            <strong>
              {assignmentsData
                ? overdueAssignments.length
                : "--"}
            </strong>
          </div>

        </div>

      </div>


      {/* ========================================
          Assignment List
      ======================================== */}

      <section className="assignments-card">

        <div className="assignments-card-header">

          <div className="assignments-title">

            <div className="assignments-title-icon">
              <ClipboardList size={19} />
            </div>

            <div>
              <h3>Assignment List</h3>

              <p>
                View your academic assignments.
              </p>
            </div>

          </div>

        </div>


        {/* ========================================
            Assignment Data
        ======================================== */}

        {assignments.length > 0 ? (

          <div className="assignment-list">

            {assignments.map((assignment) => (

              <div
                className="assignment-item"
                key={assignment.id}
              >

                {/* Left */}

                <div className="assignment-main">

                  <div className="assignment-icon">
                    <BookOpen size={18} />
                  </div>

                  <div className="assignment-info">

                    <h4>
                      {assignment.title}
                    </h4>

                    <span className="assignment-subject">
                      {assignment.subject}
                    </span>

                    {assignment.description && (
                      <p>
                        {assignment.description}
                      </p>
                    )}

                  </div>

                </div>


                {/* Due Date */}

                <div className="assignment-due">

                  <span>
                    <CalendarDays size={14} />

                    Due Date
                  </span>

                  <strong>
                    {assignment.dueDate}
                  </strong>

                </div>


                {/* Status */}

                <div
                  className={`assignment-status ${getStatusClass(
                    assignment.status
                  )}`}
                >

                  {getStatusIcon(assignment.status)}

                  <span>
                    {assignment.status || "Unknown"}
                  </span>

                </div>

              </div>

            ))}

          </div>

        ) : (

          /* ========================================
              Empty State
          ======================================== */

          <div className="assignments-empty">

            <div className="assignments-empty-icon">
              <ClipboardList size={27} />
            </div>

            <h4>
              No assignments available
            </h4>

            <p>
              Your assignments will appear here
              once they are provided by the college.
            </p>

          </div>

        )}

      </section>

    </div>
  );
}

export default Assignments;