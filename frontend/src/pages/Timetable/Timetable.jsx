import {
  CalendarDays,
  Clock3,
  MapPin,
  UserRound,
  BookOpen,
} from "lucide-react";
import { useEffect, useState } from "react";
import api from "../../services/api";

import "./Timetable.css";

function Timetable() {
  /*
    Backend integration ready structure.

    Expected API response example:

    {
      "timetable": [
        {
          "id": 1,
          "day": "Monday",
          "subject": "Database Management Systems",
          "startTime": "10:00 AM",
          "endTime": "11:00 AM",
          "faculty": "Faculty Name",
          "room": "LH-201"
        }
      ]
    }

    No dummy data is used here.
  */

  const [timetableData, setTimetableData] = useState(null);
    useEffect(() => {
    const fetchTimetable = async () => {
      try {
        const student = JSON.parse(localStorage.getItem("student"));

        if (!student?.studentId || !student?.semester) {
          return;
        }

        const response = await api.get(
          `/timetable/${student.studentId}/${student.semester}`
        );

        const timetableData = response.data.map((item) => {
          const timeParts = item.time?.split("-") || [];

          return {
            id: item.id,
            day: item.day,
            subject: item.subject,
            startTime: timeParts[0]?.trim() || "--",
            endTime: timeParts[1]?.trim() || "--",
            faculty: item.faculty,
            room: item.room,
          };
        });

        setTimetableData({
          timetable: timetableData,
        });
      } catch (error) {
        console.error("Failed to load timetable:", error);
      }
    };

    fetchTimetable();
  }, []);

  const timetable = timetableData?.timetable ?? [];

  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const getDayClasses = (day) => {
    return timetable.filter(
      (item) =>
        item?.day?.toLowerCase() === day.toLowerCase()
    );
  };

  return (
    <div className="timetable-page">

      {/* ========================================
          Page Header
      ======================================== */}

      <div className="timetable-header">
        <div>
          <h1>Timetable</h1>

          <p>
            View your daily and weekly class schedule.
          </p>
        </div>

        <div className="timetable-header-icon">
          <CalendarDays size={22} />
        </div>
      </div>


      {/* ========================================
          Weekly Timetable
      ======================================== */}

      <section className="timetable-card">

        <div className="timetable-card-header">

          <div className="timetable-title">

            <div className="timetable-title-icon">
              <CalendarDays size={19} />
            </div>

            <div>
              <h3>Weekly Timetable</h3>

              <p>
                Your scheduled classes for the week.
              </p>
            </div>

          </div>

        </div>


        {/* ========================================
            No Data State
        ======================================== */}

        {timetable.length === 0 ? (

          <div className="timetable-empty">

            <div className="timetable-empty-icon">
              <CalendarDays size={28} />
            </div>

            <h4>
              No timetable available
            </h4>

            <p>
              Your class schedule will appear here
              once it is provided by the college.
            </p>

          </div>

        ) : (

          /* ========================================
              Timetable Grid
          ======================================== */

          <div className="weekly-timetable">

            {days.map((day) => {

              const dayClasses = getDayClasses(day);

              return (
                <div
                  className="day-column"
                  key={day}
                >

                  {/* Day Header */}

                  <div className="day-header">
                    <span>{day}</span>
                  </div>


                  {/* Classes */}

                  <div className="day-classes">

                    {dayClasses.length > 0 ? (

                      dayClasses.map((classItem) => (

                        <div
                          className="class-card"
                          key={classItem.id}
                        >

                          <div className="class-card-top">

                            <div className="class-icon">
                              <BookOpen size={17} />
                            </div>

                            <span className="class-time">
                              {classItem.startTime} -{" "}
                              {classItem.endTime}
                            </span>

                          </div>


                          <h4>
                            {classItem.subject}
                          </h4>


                          <div className="class-detail">

                            <UserRound size={14} />

                            <span>
                              {classItem.faculty}
                            </span>

                          </div>


                          <div className="class-detail">

                            <MapPin size={14} />

                            <span>
                              {classItem.room}
                            </span>

                          </div>

                        </div>

                      ))

                    ) : (

                      <div className="no-class">
                        <Clock3 size={18} />

                        <span>
                          No classes
                        </span>
                      </div>

                    )}

                  </div>

                </div>
              );
            })}

          </div>
        )}

      </section>


      {/* ========================================
          Daily Schedule
      ======================================== */}

      <section className="timetable-card daily-schedule-card">

        <div className="timetable-card-header">

          <div className="timetable-title">

            <div className="timetable-title-icon blue">
              <Clock3 size={19} />
            </div>

            <div>
              <h3>Daily Schedule</h3>

              <p>
                Your classes for today.
              </p>
            </div>

          </div>

        </div>


        {timetable.length === 0 ? (

          <div className="daily-empty">

            <div className="daily-empty-icon">
              <Clock3 size={25} />
            </div>

            <h4>
              No classes scheduled
            </h4>

            <p>
              Today's schedule will appear here
              once timetable data is available.
            </p>

          </div>

        ) : (

          <div className="daily-list">

            {timetable.map((classItem) => (

              <div
                className="daily-class"
                key={classItem.id}
              >

                <div className="daily-time">
                  <strong>
                    {classItem.startTime}
                  </strong>

                  <span>
                    {classItem.endTime}
                  </span>
                </div>


                <div className="daily-divider"></div>


                <div className="daily-class-info">

                  <h4>
                    {classItem.subject}
                  </h4>

                  <div className="daily-details">

                    <span>
                      <UserRound size={14} />

                      {classItem.faculty}
                    </span>

                    <span>
                      <MapPin size={14} />

                      {classItem.room}
                    </span>

                  </div>

                </div>

              </div>

            ))}

          </div>

        )}

      </section>

    </div>
  );
}

export default Timetable;