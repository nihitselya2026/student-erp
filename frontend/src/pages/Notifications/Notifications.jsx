import { useEffect, useState } from "react";

import {
  Bell,
  BookOpen,
  ClipboardList,
  GraduationCap,
  IndianRupee,
  Megaphone,
  CheckCheck,
} from "lucide-react";

import "./Notifications.css";
import api from "../../services/api";

function Notifications() {
  /*
    Backend integration ready.

    Expected API response:

    {
      "notifications": [
        {
          "id": 1,
          "type": "ACADEMIC",
          "title": "Notification title",
          "message": "Notification message",
          "createdAt": "2026-08-30",
          "isRead": false
        }
      ]
    }

    No dummy data.
  */

  const [notificationData, setNotificationData] = useState(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

useEffect(() => {
  const fetchNotifications = async () => {
    try {
      const student = JSON.parse(localStorage.getItem("student"));

      if (!student?.studentId) {
        return;
      }

      const response = await api.get(
        `/notifications/${student.studentId}`
      );

      setNotificationData({
        notifications: response.data,
      });
    } catch (error) {
      console.error(
        "Failed to load notifications:",
        error
      );
    }
  };

  fetchNotifications();
}, []);
const handleMarkAllAsRead = async () => {
  try {
    const student = JSON.parse(
      localStorage.getItem("student")
    );

    if (!student?.studentId) {
      return;
    }

    await api.put(
      `/notifications/read-all/${student.studentId}`
    );
    setShowSuccessMessage(true);

setTimeout(() => {
  setShowSuccessMessage(false);
}, 3000);

    setNotificationData((previousData) => ({
      ...previousData,
      notifications:
        previousData?.notifications?.map((notification) => ({
          ...notification,
          isRead: true,
        })) ?? [],
    }));

  } catch (error) {
    console.error(
      "Failed to mark all notifications as read:",
      error
    );
  }
};

  const notifications = notificationData?.notifications ?? [];

  const [activeFilter, setActiveFilter] = useState("ALL");


  const filters = [
    {
      key: "ALL",
      label: "All",
    },
    {
      key: "ACADEMIC",
      label: "Academic",
    },
    {
      key: "ASSIGNMENT",
      label: "Assignments",
    },
    {
      key: "EXAM",
      label: "Exams",
    },
    {
      key: "FEE",
      label: "Fees",
    },
    {
      key: "IMPORTANT",
      label: "Important",
    },
  ];


  const getNotificationIcon = (type) => {
    switch (type?.toUpperCase()) {
      case "ACADEMIC":
        return <BookOpen size={18} />;

      case "ASSIGNMENT":
        return <ClipboardList size={18} />;

      case "EXAM":
        return <GraduationCap size={18} />;

      case "FEE":
        return <IndianRupee size={18} />;

      case "IMPORTANT":
        return <Megaphone size={18} />;

      default:
        return <Bell size={18} />;
    }
  };


  const getNotificationIconClass = (type) => {
    switch (type?.toUpperCase()) {
      case "ACADEMIC":
        return "notification-icon-academic";

      case "ASSIGNMENT":
        return "notification-icon-assignment";

      case "EXAM":
        return "notification-icon-exam";

      case "FEE":
        return "notification-icon-fee";

      case "IMPORTANT":
        return "notification-icon-important";

      default:
        return "notification-icon-default";
    }
  };


  const filteredNotifications =
    activeFilter === "ALL"
      ? notifications
      : notifications.filter(
          (notification) =>
            notification.type?.toUpperCase() === activeFilter
        );


  return (
    <div className="notifications-page">
    {showSuccessMessage && (
  <div className="notification-success-toast">
    ✓ All notifications marked as read.
  </div>
)}

      {/* ========================================
          Header
      ======================================== */}

      <div className="notifications-header">

        <div>
          <h1>Notifications</h1>

          <p>
            Stay updated with your academic activities.
          </p>
        </div>

        {notifications.length > 0 && (
          <button
           className="mark-all-button"
           onClick={handleMarkAllAsRead}
           >
            <CheckCheck size={16} />
            Mark all as read
          </button>
        )}

      </div>


      {/* ========================================
          Filters
      ======================================== */}

      <div className="notification-filters">

        {filters.map((filter) => (

          <button
            key={filter.key}
            className={
              activeFilter === filter.key
                ? "notification-filter active"
                : "notification-filter"
            }
            onClick={() => setActiveFilter(filter.key)}
          >
            {filter.label}
          </button>

        ))}

      </div>


      {/* ========================================
          Notifications Card
      ======================================== */}

      <section className="notifications-card">

        {filteredNotifications.length > 0 ? (

          <div className="notification-list">

            {filteredNotifications.map((notification) => (

              <article
                className={
                  notification.isRead
                    ? "notification-item"
                    : "notification-item unread"
                }
                key={notification.id}
              >

                {/* Icon */}

                <div
                  className={`notification-icon ${getNotificationIconClass(
                    notification.type
                  )}`}
                >
                  {getNotificationIcon(notification.type)}
                </div>


                {/* Content */}

                <div className="notification-content">

                  <div className="notification-content-top">

                    <h3>
                      {notification.title ?? "--"}
                    </h3>

                    {!notification.isRead && (
                      <span className="unread-dot"></span>
                    )}

                  </div>

                  <p>
                    {notification.message ?? "--"}
                  </p>

                  <span className="notification-date">
                    {notification.createdAt ?? "--"}
                  </span>

                </div>

              </article>

            ))}

          </div>

        ) : (

          /* ========================================
             Empty State
          ======================================== */

          <div className="notifications-empty">

            <div className="notifications-empty-icon">
              <Bell size={28} />
            </div>

            <h3>
              No notifications available
            </h3>

            <p>
              New notifications will appear here when
              there are updates related to your academics,
              assignments, exams, fees and more.
            </p>

          </div>

        )}

      </section>

    </div>
  );
}

export default Notifications;