import {
  CalendarCheck,
  BookOpen,
  TrendingUp,
  AlertCircle,
} from "lucide-react";

import { useEffect, useState } from "react";
import api from "../../services/api";

import "./Attendance.css";

function Attendance() {
  // ========================================
  // Attendance Data
  // ========================================

  const [attendanceData, setAttendanceData] = useState(null);

  // Progress bar animation value
  const [progressWidth, setProgressWidth] = useState(0);


  // ========================================
  // Fetch Attendance Data from Backend
  // ========================================

  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        const student = JSON.parse(
          localStorage.getItem("student")
        );

        if (!student?.studentId) {
          return;
        }

        const response = await api.get(
          `/attendance/${student.studentId}`
        );

        const attendance = response.data;


        // ========================================
        // Calculate Overall Attendance
        // ========================================

        const totalClasses = attendance.reduce(
          (sum, item) =>
            sum + (item.totalClasses || 0),
          0
        );

        const presentClasses = attendance.reduce(
          (sum, item) =>
            sum + (item.presentClasses || 0),
          0
        );

        const absentClasses = attendance.reduce(
          (sum, item) =>
            sum + (item.absentClasses || 0),
          0
        );


        const percentage =
          totalClasses > 0
            ? Number(
                (
                  (presentClasses / totalClasses) *
                  100
                ).toFixed(2)
              )
            : 0;


        // ========================================
        // Subject-wise Attendance
        // ========================================

        const subjects = attendance.map((item) => ({
          ...item,

          present: item.presentClasses,

          absent: item.absentClasses,

          percentage:
            item.totalClasses > 0
              ? Number(
                  (
                    (item.presentClasses /
                      item.totalClasses) *
                    100
                  ).toFixed(2)
                )
              : 0,
        }));


        // ========================================
        // Store Attendance Data
        // ========================================

        setAttendanceData({
          overall: {
            totalClasses,
            present: presentClasses,
            absent: absentClasses,
            percentage,
          },

          subjects,
        });

      } catch (error) {
        console.error(
          "Failed to load attendance:",
          error
        );
      }
    };


    fetchAttendance();
  }, []);


  // ========================================
  // Overall Attendance
  // ========================================

  const overallAttendance =
    attendanceData?.overall ?? null;


  // ========================================
  // Subject Attendance
  // ========================================

  const subjectAttendance =
    attendanceData?.subjects ?? [];


  // ========================================
  // Progress Bar Animation
  // ========================================

  useEffect(() => {
    if (overallAttendance?.percentage == null) {
      setProgressWidth(0);
      return;
    }

    setProgressWidth(0);

    const target =
      Number(overallAttendance.percentage);

    let current = 0;

    const animation = setInterval(() => {
      current += target / 50;

      if (current >= target) {
        current = target;
        clearInterval(animation);
      }

      setProgressWidth(current);
    }, 20);

    return () => clearInterval(animation);

  }, [overallAttendance?.percentage]);


  // ========================================
  // JSX
  // ========================================

  return (
    <div className="attendance-page">


      {/* ========================================
          Page Header
      ======================================== */}

      <div className="attendance-page-header">

        <div>

          <h1>
            Attendance
          </h1>

          <p>
            Track your attendance and subject-wise
            attendance details.
          </p>

        </div>

      </div>


      {/* ========================================
          Attendance Summary
      ======================================== */}

      <div className="attendance-summary">


        {/* Overall Attendance */}

        <div className="attendance-summary-card">

          <div className="attendance-summary-icon overall-attendance-icon">
            <CalendarCheck size={22} />
          </div>

          <div className="attendance-summary-content">

            <span>
              Overall Attendance
            </span>

            <strong>
              {overallAttendance?.percentage != null
                ? `${overallAttendance.percentage}%`
                : "--"}
            </strong>

            <small>
              Current semester
            </small>

          </div>

        </div>


        {/* Total Classes */}

        <div className="attendance-summary-card">

          <div className="attendance-summary-icon total-classes-icon">
            <BookOpen size={22} />
          </div>

          <div className="attendance-summary-content">

            <span>
              Total Classes
            </span>

            <strong>
              {overallAttendance?.totalClasses ??
                "--"}
            </strong>

            <small>
              Conducted
            </small>

          </div>

        </div>


        {/* Present */}

        <div className="attendance-summary-card">

          <div className="attendance-summary-icon present-classes-icon">
            <TrendingUp size={22} />
          </div>

          <div className="attendance-summary-content">

            <span>
              Present
            </span>

            <strong>
              {overallAttendance?.present ??
                "--"}
            </strong>

            <small>
              Classes attended
            </small>

          </div>

        </div>


        {/* Absent */}

        <div className="attendance-summary-card">

          <div className="attendance-summary-icon absent-classes-icon">
            <AlertCircle size={22} />
          </div>

          <div className="attendance-summary-content">

            <span>
              Absent
            </span>

            <strong>
              {overallAttendance?.absent ??
                "--"}
            </strong>

            <small>
              Classes missed
            </small>

          </div>

        </div>

      </div>


      {/* ========================================
          Overall Attendance Card
      ======================================== */}

      <section className="attendance-main-card">

        <div className="attendance-card-header">

          <div>

            <h3>
              Overall Attendance
            </h3>

            <p>
              Your current attendance performance.
            </p>

          </div>

        </div>


        <div className="attendance-main-content">


          {/* Large Attendance Circle */}

          <div className="attendance-large-circle">

            <div className="attendance-large-circle-inner">

              <strong>
                {overallAttendance?.percentage != null
                  ? `${overallAttendance.percentage}%`
                  : "--"}
              </strong>

              <span>
                Attendance
              </span>

            </div>

          </div>


          {/* Attendance Details */}

          <div className="attendance-main-details">

            <div className="attendance-progress-info">

              <div>

                <span>
                  Attendance Percentage
                </span>

                <strong>
                  {overallAttendance?.percentage != null
                    ? `${overallAttendance.percentage}%`
                    : "--"}
                </strong>

              </div>


              {/* Progress Bar */}

              <div className="attendance-progress">

                <div
                  className="attendance-progress-fill"
                  style={{
                    width: `${progressWidth}%`,
                  }}
                ></div>

              </div>

            </div>


            {/* Present / Absent Count */}

            <div className="attendance-count-row">


              {/* Present */}

              <div>

                <span className="attendance-count-dot present-count-dot"></span>

                <span>
                  Present
                </span>

                <strong>
                  {overallAttendance?.present ??
                    "--"}
                </strong>

              </div>


              {/* Absent */}

              <div>

                <span className="attendance-count-dot absent-count-dot"></span>

                <span>
                  Absent
                </span>

                <strong>
                  {overallAttendance?.absent ??
                    "--"}
                </strong>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* ========================================
          Subject-wise Attendance
      ======================================== */}

      <section className="attendance-main-card subject-attendance-card">

        <div className="attendance-card-header">

          <div>

            <h3>
              Subject-wise Attendance
            </h3>

            <p>
              View attendance for each subject.
            </p>

          </div>

        </div>


        {subjectAttendance.length > 0 ? (

          <div className="subject-attendance-table-wrapper">

            <table className="subject-attendance-table">

              <thead>

                <tr>

                  <th>
                    Subject
                  </th>

                  <th>
                    Total Classes
                  </th>

                  <th>
                    Present
                  </th>

                  <th>
                    Absent
                  </th>

                  <th>
                    Percentage
                  </th>

                  <th>
                    Status
                  </th>

                </tr>

              </thead>


              <tbody>

                {subjectAttendance.map(
                  (subject) => (

                    <tr key={subject.id}>

                      <td>

                        <div className="subject-name">

                          <div className="subject-icon">
                            <BookOpen size={16} />
                          </div>

                          <span>
                            {subject.subject}
                          </span>

                        </div>

                      </td>


                      <td>
                        {subject.totalClasses ??
                          "--"}
                      </td>


                      <td>
                        {subject.present ??
                          "--"}
                      </td>


                      <td>
                        {subject.absent ??
                          "--"}
                      </td>


                      <td>

                        <strong>
                          {subject.percentage != null
                            ? `${subject.percentage}%`
                            : "--"}
                        </strong>

                      </td>


                      <td>

                        <span
                          className={`attendance-status ${
                            subject.status?.toLowerCase() ??
                            ""
                          }`}
                        >
                          {subject.status ??
                            "--"}
                        </span>

                      </td>

                    </tr>

                  )
                )}

              </tbody>

            </table>

          </div>

        ) : (

          <div className="attendance-empty-state">

            <div className="attendance-empty-icon">
              <CalendarCheck size={24} />
            </div>

            <h4>
              No attendance data available
            </h4>

            <p>
              Subject-wise attendance will appear
              here once data is available.
            </p>

          </div>

        )}

      </section>


      {/* ========================================
          Monthly / Semester View
      ======================================== */}

      <section className="attendance-main-card attendance-period-card">

        <div className="attendance-card-header">

          <div>

            <h3>
              Attendance Overview
            </h3>

            <p>
              Review your attendance by month or semester.
            </p>

          </div>

        </div>


        <div className="attendance-period-empty">

          <div className="attendance-period-icon">
            <CalendarCheck size={24} />
          </div>

          <h4>
            Attendance history unavailable
          </h4>

          <p>
            Monthly and semester attendance data
            will appear here.
          </p>

        </div>

      </section>


    </div>
  );
}

export default Attendance;