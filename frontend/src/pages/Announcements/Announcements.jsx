import {
  Megaphone,
  CalendarDays,
  Building2,
  Star,
  Bell,
  FileText,
} from "lucide-react";

import { useEffect, useState } from "react";
import api from "../../services/api";

import "./Announcements.css";

function Announcements() {
  /*
    Backend integration ready.

    Expected API response:

    {
      "announcements": [
        {
          "id": 1,
          "title": "Announcement title",
          "description": "Announcement description",
          "category": "COLLEGE",
          "priority": "IMPORTANT",
          "publishedAt": "2026-09-01"
        }
      ]
    }

    No dummy data.
  */

 const [announcementsData, setAnnouncementsData] = useState(null);

useEffect(() => {
  const fetchAnnouncements = async () => {
    try {
      const student = JSON.parse(localStorage.getItem("student"));

      if (!student?.studentId) {
        return;
      }

      const response = await api.get(
        `/announcements/${student.studentId}`
      );

      setAnnouncementsData({
        announcements: response.data,
      });
    } catch (error) {
      console.error("Failed to load announcements:", error);
    }
  };

  fetchAnnouncements();
}, []);

  const announcements =
    announcementsData?.announcements ?? [];


  const getCategoryClass = (category) => {
    switch (category?.toUpperCase()) {
      case "COLLEGE":
        return "category-college";

      case "DEPARTMENT":
        return "category-department";

      case "ACADEMIC":
        return "category-academic";

      default:
        return "category-default";
    }
  };


  const getCategoryIcon = (category) => {
    switch (category?.toUpperCase()) {
      case "COLLEGE":
        return <Building2 size={14} />;

      case "DEPARTMENT":
        return <FileText size={14} />;

      case "ACADEMIC":
        return <Bell size={14} />;

      default:
        return <Megaphone size={14} />;
    }
  };


  const getPriorityClass = (priority) => {
    switch (priority?.toUpperCase()) {
      case "IMPORTANT":
        return "priority-important";

      case "NORMAL":
        return "priority-normal";

      case "URGENT":
        return "priority-urgent";

      default:
        return "priority-default";
    }
  };


  return (
    <div className="announcements-page">

      {/* ========================================
          Header
      ======================================== */}

      <div className="announcements-header">

        <div>
          <h1>Announcements</h1>

          <p>
            Stay updated with the latest college notices.
          </p>
        </div>

        <div className="announcements-header-icon">
          <Megaphone size={22} />
        </div>

      </div>


      {/* ========================================
          Summary
      ======================================== */}

      <div className="announcement-summary">

        <div className="announcement-summary-card">

          <div className="summary-icon total">
            <Megaphone size={19} />
          </div>

          <div>
            <span>Total Announcements</span>

            <strong>
              {announcementsData
                ? announcements.length
                : "--"}
            </strong>
          </div>

        </div>


        <div className="announcement-summary-card">

          <div className="summary-icon college">
            <Building2 size={19} />
          </div>

          <div>
            <span>College Notices</span>

            <strong>
              {announcementsData
                ? announcements.filter(
                    (item) =>
                      item?.category?.toUpperCase() ===
                      "COLLEGE"
                  ).length
                : "--"}
            </strong>
          </div>

        </div>


        <div className="announcement-summary-card">

          <div className="summary-icon department">
            <FileText size={19} />
          </div>

          <div>
            <span>Department Notices</span>

            <strong>
              {announcementsData
                ? announcements.filter(
                    (item) =>
                      item?.category?.toUpperCase() ===
                      "DEPARTMENT"
                  ).length
                : "--"}
            </strong>
          </div>

        </div>


        <div className="announcement-summary-card">

          <div className="summary-icon important">
            <Star size={19} />
          </div>

          <div>
            <span>Important</span>

            <strong>
              {announcementsData
                ? announcements.filter(
                    (item) =>
                      item?.priority?.toUpperCase() ===
                      "IMPORTANT"
                  ).length
                : "--"}
            </strong>
          </div>

        </div>

      </div>


      {/* ========================================
          Announcement Card
      ======================================== */}

      <section className="announcements-card">

        <div className="announcements-card-header">

          <div className="announcements-title">

            <div className="announcements-title-icon">
              <Megaphone size={19} />
            </div>

            <div>
              <h3>Recent Announcements</h3>

              <p>
                College and department updates.
              </p>
            </div>

          </div>

        </div>


        {/* ========================================
            Announcement List
        ======================================== */}

        {announcements.length > 0 ? (

          <div className="announcement-list">

            {announcements.map((announcement) => (

              <article
                className="announcement-card-item"
                key={announcement.id}
              >

                {/* Top */}

                <div className="announcement-item-top">

                  <div className="announcement-item-title">

                    <div className="announcement-item-icon">
                      <Megaphone size={17} />
                    </div>

                    <div>
                      <h4>
                        {announcement.title}
                      </h4>

                      <div className="announcement-meta">

                        <span
                          className={`announcement-category ${getCategoryClass(
                            announcement.category
                          )}`}
                        >
                          {getCategoryIcon(
                            announcement.category
                          )}

                          {announcement.category ??
                            "Announcement"}
                        </span>

                      </div>
                    </div>

                  </div>


                  {/* Priority */}

                  {announcement.priority && (

                    <span
                      className={`announcement-priority ${getPriorityClass(
                        announcement.priority
                      )}`}
                    >
                      <Star size={12} />

                      {announcement.priority}
                    </span>

                  )}

                </div>


                {/* Description */}

                {announcement.message && (

                  <p className="announcement-description">
                    {announcement.message}
                  </p>

                )}


                {/* Bottom */}

                <div className="announcement-item-bottom">

                  <span>
                    <CalendarDays size={13} />

                    Published
                  </span>

                  <strong>
                   {announcement.createdAt ?? "--"}
                  </strong>

                </div>

              </article>

            ))}

          </div>

        ) : (

          /* ========================================
              Empty State
          ======================================== */

          <div className="announcements-empty">

            <div className="announcements-empty-icon">
              <Megaphone size={28} />
            </div>

            <h4>
              No announcements available
            </h4>

            <p>
              New college and department announcements
              will appear here.
            </p>

          </div>

        )}

      </section>

    </div>
  );
}

export default Announcements;