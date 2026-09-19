import { useEffect, useState } from "react";
import {
  GraduationCap,
  TrendingUp,
  CalendarCheck,
  ClipboardList,
  Megaphone,
  ArrowRight,
  CalendarDays,
  BookOpen,
  FileText,
  CreditCard,
} from "lucide-react";

import { useNavigate } from "react-router-dom";
import api from "../../services/api";

import "./Dashboard.css";

function Dashboard() {
  const navigate = useNavigate();

  const [dashboardData, setDashboardData] = useState(null);

  // Attendance number animation
  const [animatedAttendance, setAnimatedAttendance] = useState(0);

  // Attendance circle animation
  const [attendanceProgress, setAttendanceProgress] = useState(0);

  // CGPA number animation
  const [animatedCgpa, setAnimatedCgpa] = useState(0);


  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const student = JSON.parse(
          localStorage.getItem("student")
        );

        if (!student?.studentId) {
          return;
        }

        const studentId = student.studentId;
        const semester = student.semester;

        const [
          studentResponse,
          attendanceResponse,
          academicsResponse,
          announcementsResponse,
          timetableResponse,
          assignmentsResponse,
        ] = await Promise.all([
          api.get(`/students/${student.id}`),
          api.get(`/attendance/${studentId}`),
          api.get(`/academics/${studentId}`),
          api.get(`/announcements/${studentId}`),
          api.get(`/timetable/${studentId}/${semester}`),
          api.get(`/assignments/${studentId}/${semester}`),
        ]);

        const studentData = studentResponse.data;
        const attendance = attendanceResponse.data;
        const academics = academicsResponse.data;
        const announcementsData =
          announcementsResponse.data;
        const timetable = timetableResponse.data;
        const assignments = assignmentsResponse.data;

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

        const attendancePercentage =
          totalClasses > 0
            ? (
                (presentClasses / totalClasses) *
                100
              ).toFixed(2)
            : 0;

        const currentAcademic = academics.find(
          (item) => item.semester === semester
        );

        const pendingAssignmentsList =
          assignments.filter(
            (item) => item.status === "Pending"
          );

        setDashboardData({
          semester: studentData.semester,
          course: studentData.course,

          cgpa: currentAcademic?.cgpa ?? null,

          attendance: Number(
            attendancePercentage
          ),

          pendingAssignments:
            pendingAssignmentsList.length,

          attendanceOverview: {
            totalClasses,
            present: presentClasses,
            absent: absentClasses,
            percentage: Number(
              attendancePercentage
            ),
          },

          announcements: announcementsData,

          upcomingClasses: timetable,

          pendingAssignmentsList,
        });
      } catch (error) {
        console.error(
          "Failed to load dashboard data:",
          error
        );
      }
    };

    fetchDashboardData();
  }, []);


  // ========================================
  // Attendance Number + Circle Animation
  // ========================================

  useEffect(() => {
    if (dashboardData?.attendance == null) {
      return;
    }

    const target = Number(
      dashboardData.attendance
    );

    let current = 0;

    setAnimatedAttendance(0);
    setAttendanceProgress(0);

    const animation = setInterval(() => {
      current += 1;

      if (current >= target) {
        current = target;
        clearInterval(animation);
      }

      setAnimatedAttendance(current);

      setAttendanceProgress(
        current * 3.6
      );
    }, 20);

    return () => {
      clearInterval(animation);
    };
  }, [dashboardData?.attendance]);


  // ========================================
  // CGPA Animation
  // ========================================

  useEffect(() => {
    if (dashboardData?.cgpa == null) {
      return;
    }

    const target = Number(
      dashboardData.cgpa
    );

    let current = 0;

    setAnimatedCgpa(0);

    const animation = setInterval(() => {

  current += target / 75;

  if (current >= target) {
    current = target;
    clearInterval(animation);
  }

  setAnimatedCgpa(
    Number(current.toFixed(2))
  );

}, 20);

    return () => {
      clearInterval(animation);
    };

  }, [dashboardData?.cgpa]);


  const attendanceData =
    dashboardData?.attendanceOverview ?? null;

  const announcements =
    dashboardData?.announcements ?? [];

  const upcomingClasses =
    dashboardData?.upcomingClasses ?? [];

  const pendingAssignments =
    dashboardData?.pendingAssignmentsList ?? [];


  // ========================================
  // Quick Access
  // ========================================

  const quickAccessItems = [
    {
      title: "Attendance",
      description: "View attendance details",
      icon: CalendarCheck,
      path: "/attendance",
      className: "quick-access-attendance",
    },
    {
      title: "Academics",
      description: "View subjects and marks",
      icon: BookOpen,
      path: "/academics",
      className: "quick-access-academics",
    },
    {
      title: "Timetable",
      description: "View your class schedule",
      icon: CalendarDays,
      path: "/timetable",
      className: "quick-access-timetable",
    },
    {
      title: "Assignments",
      description: "Manage your assignments",
      icon: ClipboardList,
      path: "/assignments",
      className: "quick-access-assignments",
    },
    {
      title: "Examinations",
      description: "View exams and results",
      icon: FileText,
      path: "/examinations",
      className: "quick-access-examinations",
    },
    {
      title: "Fees",
      description: "View fee details",
      icon: CreditCard,
      path: "/fees",
      className: "quick-access-fees",
    },
  ];


  return (
    <div className="dashboard-page dashboard-animate-page">

      {/* Dashboard Header */}

      <div className="dashboard-header dashboard-animate-header">

        <div>

          <h1>
            Welcome back!
          </h1>

          <p>
            Here's what's happening with your academic journey today.
          </p>

        </div>

      </div>


      {/* Statistics */}

      <div className="dashboard-stats dashboard-animate-stats">

        {/* Semester */}

        <div className="stat-card dashboard-stat-card-1">

          <div className="stat-icon semester-icon">
            <GraduationCap size={24} />
          </div>

          <div className="stat-content">

            <span className="stat-label">
              Current Semester
            </span>

            <h2>
              {dashboardData?.semester ?? "--"}
            </h2>

            <span className="stat-description">
              {dashboardData?.course ??
                "Not available"}
            </span>

          </div>

        </div>


        {/* CGPA */}

        <div className="stat-card dashboard-stat-card-2">

          <div className="stat-icon cgpa-icon">
            <TrendingUp size={24} />
          </div>

          <div className="stat-content">

            <span className="stat-label">
              CGPA
            </span>

            <h2>
              {dashboardData?.cgpa != null
                ? animatedCgpa.toFixed(2)
                : "--"}
            </h2>

            <span className="stat-description">
              Till Now
            </span>

          </div>

        </div>


        {/* Attendance */}

        <div className="stat-card dashboard-stat-card-3">

          <div className="stat-icon attendance-icon">
            <CalendarCheck size={24} />
          </div>

          <div className="stat-content">

            <span className="stat-label">
              Attendance
            </span>

            <h2>
              {dashboardData?.attendance != null
                ? `${animatedAttendance}%`
                : "--"}
            </h2>

            <span className="stat-description">
              Overall
            </span>

          </div>

        </div>


        {/* Pending Assignments */}

        <div className="stat-card dashboard-stat-card-4">

          <div className="stat-icon assignment-icon">
            <ClipboardList size={24} />
          </div>

          <div className="stat-content">

            <span className="stat-label">
              Pending Assignments
            </span>

            <h2>
              {dashboardData?.pendingAssignments ??
                "--"}
            </h2>

            <span className="stat-description">
              View All
            </span>

          </div>

        </div>

      </div>


      {/* Middle Section */}

      <div className="dashboard-middle dashboard-animate-middle">

        {/* Attendance Overview */}

        <section className="dashboard-card attendance-card dashboard-content-card-1">

          <div className="card-header">

            <h3>
              Attendance Overview
            </h3>

          </div>


          <div className="attendance-content">

            {/* Attendance Circle */}

            <div
              className="attendance-circle"
              style={{
                background: `conic-gradient(
                  #22b573 0deg,
                  #22b573 ${attendanceProgress}deg,
                  #e9eef4 ${attendanceProgress}deg,
                  #e9eef4 360deg
                )`,
              }}
            >

              <div className="attendance-circle-inner">

                <strong>
                  {attendanceData?.percentage != null
                    ? `${animatedAttendance}%`
                    : "--"}
                </strong>

                <span>
                  Overall
                </span>

              </div>

            </div>


            {/* Attendance Details */}

            <div className="attendance-details">

              <div className="attendance-detail">

                <span className="detail-dot total-dot"></span>

                <span>
                  Total Classes
                </span>

                <strong>
                  {attendanceData?.totalClasses ??
                    "--"}
                </strong>

              </div>


              <div className="attendance-detail">

                <span className="detail-dot present-dot"></span>

                <span>
                  Present
                </span>

                <strong>
                  {attendanceData?.present ??
                    "--"}
                </strong>

              </div>


              <div className="attendance-detail">

                <span className="detail-dot absent-dot"></span>

                <span>
                  Absent
                </span>

                <strong>
                  {attendanceData?.absent ??
                    "--"}
                </strong>

              </div>


              <div className="attendance-detail">

                <span className="detail-dot percentage-dot"></span>

                <span>
                  Percentage
                </span>

                <strong>
                  {attendanceData?.percentage != null
                    ? `${animatedAttendance}%`
                    : "--"}
                </strong>

              </div>

            </div>

          </div>


          <button
            type="button"
            className="card-action"
            onClick={() =>
              navigate("/attendance")
            }
          >
            View Attendance
            <ArrowRight size={16} />
          </button>

        </section>


        {/* Announcements */}

        <section className="dashboard-card announcements-card dashboard-content-card-2">

          <div className="card-header">

            <div className="card-title">

              <Megaphone size={19} />

              <h3>
                Recent Announcements
              </h3>

            </div>


            <button
              type="button"
              className="view-all-button"
              onClick={() =>
                navigate("/announcements")
              }
            >
              View All
            </button>

          </div>


          {announcements.length > 0 ? (

            <div className="announcement-list">

              {announcements.map(
                (announcement) => (

                  <div
                    className="announcement-item"
                    key={announcement.id}
                  >

                    <div className="announcement-dot"></div>

                    <div className="announcement-content">

                      <h4>
                        {announcement.title}
                      </h4>

                      <p>
                        {announcement.description}
                      </p>

                      <span>
                        {announcement.createdAt}
                      </span>

                    </div>

                  </div>

                )
              )}

            </div>

          ) : (

            <div className="empty-state">

              <div className="empty-icon">
                <Megaphone size={22} />
              </div>

              <h4>
                No announcements available
              </h4>

              <p>
                New announcements will appear here.
              </p>

            </div>

          )}

        </section>

      </div>


      {/* Lower Section */}

      <div className="dashboard-lower-grid dashboard-animate-lower">

        {/* Upcoming Classes */}

        <section className="dashboard-card upcoming-card dashboard-content-card-3">

          <div className="card-header">

            <h3>
              Upcoming Classes
            </h3>

            <button
              type="button"
              className="view-all-button"
              onClick={() =>
                navigate("/timetable")
              }
            >
              View Timetable
            </button>

          </div>


          {upcomingClasses.length > 0 ? (

            <div className="dashboard-list">

              {upcomingClasses.map((item) => (

                <div
                  className="dashboard-list-item"
                  key={item.id}
                >
                  {item.name}
                </div>

              ))}

            </div>

          ) : (

            <div className="empty-state">

              <div className="empty-icon">
                <GraduationCap size={22} />
              </div>

              <h4>
                No upcoming classes
              </h4>

              <p>
                Your upcoming classes will appear here.
              </p>

            </div>

          )}

        </section>


        {/* Pending Assignments */}

        <section className="dashboard-card assignments-dashboard-card dashboard-content-card-4">

          <div className="card-header">

            <h3>
              Pending Assignments
            </h3>

            <button
              type="button"
              className="view-all-button"
              onClick={() =>
                navigate("/assignments")
              }
            >
              View All
            </button>

          </div>


          {pendingAssignments.length > 0 ? (

            <div className="dashboard-list">

              {pendingAssignments.map((item) => (

                <div
                  className="dashboard-list-item"
                  key={item.id}
                >
                  {item.title}
                </div>

              ))}

            </div>

          ) : (

            <div className="empty-state">

              <div className="empty-icon">
                <ClipboardList size={22} />
              </div>

              <h4>
                No pending assignments
              </h4>

              <p>
                Your pending assignments will appear here.
              </p>

            </div>

          )}

        </section>

      </div>


      {/* Quick Access */}

      <section className="quick-access-section dashboard-animate-quick">

        <div className="quick-access-header">

          <h3>
            Quick Access
          </h3>

          <p>
            Access your frequently used student services.
          </p>

        </div>


        <div className="quick-access-grid">

          {quickAccessItems.map((item) => {

            const Icon = item.icon;

            return (
              <button
                key={item.path}
                type="button"
                className={`quick-access-card ${item.className} quick-access-animated`}
                onClick={() =>
                  navigate(item.path)
                }
              >

                <div className="quick-access-icon">

                  <Icon size={22} />

                </div>


                <div className="quick-access-content">

                  <strong>
                    {item.title}
                  </strong>

                  <span>
                    {item.description}
                  </span>

                </div>


                <ArrowRight
                  size={18}
                  className="quick-access-arrow"
                />

              </button>
            );

          })}

        </div>

      </section>

    </div>
  );
}

export default Dashboard;