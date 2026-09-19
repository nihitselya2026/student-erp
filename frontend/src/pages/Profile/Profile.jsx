import {
  User,
  GraduationCap,
  Phone,
  Mail,
  MapPin,
} from "lucide-react";

import "./Profile.css";
import { useEffect, useState } from "react";
import api from "../../services/api";

function Profile() {
  // Profile data from backend
  const [profileData, setProfileData] = useState(null);

  // Profile image stored in localStorage
  const [profileImage, setProfileImage] = useState("");

  // ========================================
  // Load Student Profile Image
  // ========================================
  useEffect(() => {
    try {
      const student = JSON.parse(
        localStorage.getItem("student")
      );

      if (!student?.studentId) {
        return;
      }

      const storedImage = localStorage.getItem(
        `studentProfileImage_${student.studentId}`
      );

      if (storedImage) {
        setProfileImage(storedImage);
      }
    } catch (error) {
      console.error(
        "Failed to load profile image:",
        error
      );
    }
  }, []);

  // ========================================
  // Fetch Profile Data from Backend
  // ========================================
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const student = JSON.parse(
          localStorage.getItem("student")
        );

        if (!student?.id) {
          return;
        }

        const response = await api.get(
          `/students/${student.id}`
        );

        setProfileData(response.data);
      } catch (error) {
        console.error(
          "Failed to load profile:",
          error
        );
      }
    };

    fetchProfile();
  }, []);

  return (
    <div className="profile-page">

      {/* ========================================
          Page Header
      ======================================== */}

      <div className="profile-page-header">
        <div>
          <h1>My Profile</h1>

          <p>
            View and manage your personal and academic information.
          </p>
        </div>
      </div>


      {/* ========================================
          Profile Overview
      ======================================== */}

      <section className="profile-overview-card">

        <div className="profile-avatar">

          {profileImage ? (
            <img
              src={profileImage}
              alt="Student profile"
            />
          ) : (
            <User size={42} />
          )}

        </div>


        <div className="profile-overview-content">

          <h2>
            {profileData?.name ?? "Student Name"}
          </h2>

          <p>
            {profileData?.studentId ??
              "Student ID not available"}
          </p>

          <div className="profile-course">

            <GraduationCap size={16} />

            <span>
              {profileData?.course ??
                "Course not available"}
            </span>

          </div>

        </div>

      </section>


      {/* ========================================
          Personal Details
      ======================================== */}

      <section className="profile-card profile-personal-card">

        <div className="profile-card-header">

          <div className="profile-card-title">

            <div className="profile-section-icon personal-icon">
              <User size={18} />
            </div>

            <div>
              <h3>Personal Details</h3>

              <p>
                Your basic personal information
              </p>
            </div>

          </div>

        </div>


        <div className="profile-details-grid">

          {/* Full Name */}

          <div className="profile-detail-item">

            <span className="profile-detail-label">
              Full Name
            </span>

            <strong>
              {profileData?.name ??
                "Not available"}
            </strong>

          </div>


          {/* Date of Birth */}

          <div className="profile-detail-item">

            <span className="profile-detail-label">
              Date of Birth
            </span>

            <strong>
              {profileData?.dateOfBirth ??
                "Not available"}
            </strong>

          </div>


          {/* Gender */}

          <div className="profile-detail-item">

            <span className="profile-detail-label">
              Gender
            </span>

            <strong>
              {profileData?.gender ??
                "Not available"}
            </strong>

          </div>


          {/* Blood Group */}

          <div className="profile-detail-item">

            <span className="profile-detail-label">
              Blood Group
            </span>

            <strong>
              {profileData?.bloodGroup ??
                "Not available"}
            </strong>

          </div>

        </div>

      </section>


      {/* ========================================
          Academic Details
      ======================================== */}

      <section className="profile-card profile-academic-card">

        <div className="profile-card-header">

          <div className="profile-card-title">

            <div className="profile-section-icon academic-icon">
              <GraduationCap size={18} />
            </div>

            <div>
              <h3>Academic Details</h3>

              <p>
                Your academic information
              </p>
            </div>

          </div>

        </div>


        <div className="profile-details-grid">

          {/* Student ID */}

          <div className="profile-detail-item">

            <span className="profile-detail-label">
              Student ID
            </span>

            <strong>
              {profileData?.studentId ??
                "Not available"}
            </strong>

          </div>


          {/* Roll Number */}

          <div className="profile-detail-item">

            <span className="profile-detail-label">
              Roll Number
            </span>

            <strong>
              {profileData?.rollNumber ??
                "Not available"}
            </strong>

          </div>


          {/* Department */}

          <div className="profile-detail-item">

            <span className="profile-detail-label">
              Department
            </span>

            <strong>
              {profileData?.department ??
                "Not available"}
            </strong>

          </div>


          {/* Course */}

          <div className="profile-detail-item">

            <span className="profile-detail-label">
              Course
            </span>

            <strong>
              {profileData?.course ??
                "Not available"}
            </strong>

          </div>


          {/* Current Semester */}

          <div className="profile-detail-item">

            <span className="profile-detail-label">
              Current Semester
            </span>

            <strong>
              {profileData?.semester ??
                "Not available"}
            </strong>

          </div>


          {/* Admission Year */}

          <div className="profile-detail-item">

            <span className="profile-detail-label">
              Admission Year
            </span>

            <strong>
              {profileData?.admissionYear ??
                "Not available"}
            </strong>

          </div>

        </div>

      </section>


      {/* ========================================
          Contact Details
      ======================================== */}

      <section className="profile-card profile-contact-card">

        <div className="profile-card-header">

          <div className="profile-card-title">

            <div className="profile-section-icon contact-icon">
              <Phone size={18} />
            </div>

            <div>
              <h3>Contact Details</h3>

              <p>
                Your contact information
              </p>
            </div>

          </div>

        </div>


        <div className="profile-contact-grid">

          {/* Email */}

          <div className="profile-contact-item">

            <div className="contact-item-icon">
              <Mail size={18} />
            </div>

            <div>

              <span>
                Email Address
              </span>

              <strong>
                {profileData?.email ??
                  "Not available"}
              </strong>

            </div>

          </div>


          {/* Phone */}

          <div className="profile-contact-item">

            <div className="contact-item-icon">
              <Phone size={18} />
            </div>

            <div>

              <span>
                Phone Number
              </span>

              <strong>
                {profileData?.phone ??
                  "Not available"}
              </strong>

            </div>

          </div>


          {/* Address */}

          <div className="profile-contact-item profile-address-item">

            <div className="contact-item-icon">
              <MapPin size={18} />
            </div>

            <div>

              <span>
                Address
              </span>

              <strong>
                {profileData?.address ??
                  "Not available"}
              </strong>

            </div>

          </div>

        </div>

      </section>

    </div>
  );
}

export default Profile;