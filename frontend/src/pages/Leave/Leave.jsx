import { useEffect, useState } from "react";

import {
  FileText,
  CalendarDays,
  Clock3,
  CheckCircle2,
  XCircle,
  Plus,
  ClipboardList,
  X,
} from "lucide-react";

import "./Leave.css";
import api from "../../services/api";

function Leave() {
  const [showLeaveForm, setShowLeaveForm] = useState(false);

  const [formData, setFormData] = useState({
    leaveType: "",
    fromDate: "",
    toDate: "",
    reason: "",
  });

  /*
    Backend integration ready.

    No dummy data.
  */

  const [leaveData, setLeaveData] = useState(null);
  const fetchLeaves = async () => {
  try {
    const student = JSON.parse(localStorage.getItem("student"));

    if (!student?.studentId) {
      return;
    }

    const response = await api.get(
      `/leaves/${student.studentId}`
    );

    const leaveHistory = response.data;

    const total = leaveHistory.length;

    const pending = leaveHistory.filter(
      (leave) => leave.status?.toUpperCase() === "PENDING"
    ).length;

    const approved = leaveHistory.filter(
      (leave) => leave.status?.toUpperCase() === "APPROVED"
    ).length;

    const rejected = leaveHistory.filter(
      (leave) => leave.status?.toUpperCase() === "REJECTED"
    ).length;

    setLeaveData({
      leaveSummary: {
        total,
        pending,
        approved,
        rejected,
      },
      leaveHistory,
    });
  } catch (error) {
    console.error("Failed to load leaves:", error);
  }
};
useEffect(() => {
  fetchLeaves();
}, []);
  const summary = leaveData?.leaveSummary ?? null;
  const leaveHistory = leaveData?.leaveHistory ?? [];


  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };


  const handleCloseForm = () => {
    setShowLeaveForm(false);
    

    setFormData({
      leaveType: "",
      fromDate: "",
      toDate: "",
      reason: "",
    });
  };


  const handleSubmit = async (event) => {
  event.preventDefault();

  try {
    const student = JSON.parse(localStorage.getItem("student"));

    if (!student?.studentId) {
      return;
    }

    const response = await api.post("/leaves", {
      studentId: student.studentId,
      leaveType: formData.leaveType,
      fromDate: formData.fromDate,
      toDate: formData.toDate,
      reason: formData.reason,
      status: "PENDING",
    });

    console.log("Leave submitted:", response.data);
    await fetchLeaves();
    setShowLeaveForm(false);
  } catch (error) {
    console.error("Failed to submit leave:", error);
  }
};


  const getStatusClass = (status) => {
    switch (status?.toUpperCase()) {
      case "APPROVED":
        return "leave-status-approved";

      case "REJECTED":
        return "leave-status-rejected";

      case "PENDING":
        return "leave-status-pending";

      default:
        return "leave-status-default";
    }
  };


  const getStatusIcon = (status) => {
    switch (status?.toUpperCase()) {
      case "APPROVED":
        return <CheckCircle2 size={14} />;

      case "REJECTED":
        return <XCircle size={14} />;

      case "PENDING":
        return <Clock3 size={14} />;

      default:
        return <FileText size={14} />;
    }
  };


  return (
    <div className="leave-page">

      {/* ========================================
          Header
      ======================================== */}

      <div className="leave-header">

        <div>
          <h1>Leave</h1>

          <p>
            Apply for leave and track your leave requests.
          </p>
        </div>

        <button
          className="apply-leave-button"
          onClick={() => setShowLeaveForm(true)}
        >
          <Plus size={17} />
          Apply for Leave
        </button>

      </div>


      {/* ========================================
          Summary
      ======================================== */}

      <div className="leave-summary">

        <div className="leave-summary-card">

          <div className="leave-summary-icon total">
            <ClipboardList size={19} />
          </div>

          <div>
            <span>Total Requests</span>

            <strong>
              {summary?.total ?? "--"}
            </strong>
          </div>

        </div>


        <div className="leave-summary-card">

          <div className="leave-summary-icon pending">
            <Clock3 size={19} />
          </div>

          <div>
            <span>Pending</span>

            <strong>
              {summary?.pending ?? "--"}
            </strong>
          </div>

        </div>


        <div className="leave-summary-card">

          <div className="leave-summary-icon approved">
            <CheckCircle2 size={19} />
          </div>

          <div>
            <span>Approved</span>

            <strong>
              {summary?.approved ?? "--"}
            </strong>
          </div>

        </div>


        <div className="leave-summary-card">

          <div className="leave-summary-icon rejected">
            <XCircle size={19} />
          </div>

          <div>
            <span>Rejected</span>

            <strong>
              {summary?.rejected ?? "--"}
            </strong>
          </div>

        </div>

      </div>


      {/* ========================================
          Leave History
      ======================================== */}

      <section className="leave-card">

        <div className="leave-card-header">

          <div className="leave-title">

            <div className="leave-title-icon">
              <FileText size={19} />
            </div>

            <div>
              <h3>Leave History</h3>

              <p>
                Track all your leave applications.
              </p>
            </div>

          </div>

        </div>


        {leaveHistory.length > 0 ? (

          <div className="leave-list">

            {leaveHistory.map((leave) => (

              <article
                className="leave-item"
                key={leave.id}
              >

                <div className="leave-type">

                  <div className="leave-type-icon">
                    <FileText size={17} />
                  </div>

                  <div>
                    <h4>
                      {leave.leaveType ?? "--"}
                    </h4>

                    <span>
                      Leave Type
                    </span>
                  </div>

                </div>


                <div className="leave-date">

                  <span>
                    <CalendarDays size={13} />
                    Duration
                  </span>

                  <strong>
                    {leave.fromDate ?? "--"}
                    {" - "}
                    {leave.toDate ?? "--"}
                  </strong>

                </div>


                <div className="leave-reason">

                  <span>
                    Reason
                  </span>

                  <strong>
                    {leave.reason ?? "--"}
                  </strong>

                </div>


                <div className="leave-applied">

                  <span>
                    Applied On
                  </span>

                  <strong>
                    {leave.appliedOn ?? "--"}
                  </strong>

                </div>


                <div
                  className={`leave-status ${getStatusClass(
                    leave.status
                  )}`}
                >
                  {getStatusIcon(leave.status)}

                  <span>
                    {leave.status ?? "--"}
                  </span>
                </div>

              </article>

            ))}

          </div>

        ) : (

          <div className="leave-empty">

            <div className="leave-empty-icon">
              <ClipboardList size={28} />
            </div>

            <h4>
              No leave requests available
            </h4>

            <p>
              Your leave applications will appear
              here once you apply for leave.
            </p>

          </div>

        )}

      </section>


      {/* ========================================
          Apply Leave Modal
      ======================================== */}

      {showLeaveForm && (

        <div
          className="leave-modal-overlay"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              handleCloseForm();
            }
          }}
        >

          <div className="leave-modal">

            {/* Modal Header */}

            <div className="leave-modal-header">

              <div className="leave-modal-title">

                <div className="leave-modal-icon">
                  <FileText size={19} />
                </div>

                <div>
                  <h2>Apply for Leave</h2>

                  <p>
                    Submit your leave request.
                  </p>
                </div>

              </div>

              <button
                type="button"
                className="leave-modal-close"
                onClick={handleCloseForm}
                aria-label="Close"
              >
                <X size={19} />
              </button>

            </div>


            {/* Form */}

            <form
              className="leave-form"
              onSubmit={handleSubmit}
            >

              {/* Leave Type */}

              <div className="leave-form-group">

                <label htmlFor="leaveType">
                  Leave Type
                  <span>*</span>
                </label>

                <select
                  id="leaveType"
                  name="leaveType"
                  value={formData.leaveType}
                  onChange={handleChange}
                  required
                >

                  <option value="">
                    Select leave type
                  </option>

                  <option value="PERSONAL">
                    Personal Leave
                  </option>

                  <option value="MEDICAL">
                    Medical Leave
                  </option>

                  <option value="EMERGENCY">
                    Emergency Leave
                  </option>

                  <option value="OTHER">
                    Other
                  </option>

                </select>

              </div>


              {/* Dates */}

              <div className="leave-form-row">

                <div className="leave-form-group">

                  <label htmlFor="fromDate">
                    From Date
                    <span>*</span>
                  </label>

                  <div className="date-input-wrapper">

                    <CalendarDays size={16} />

                    <input
                      id="fromDate"
                      type="date"
                      name="fromDate"
                      value={formData.fromDate}
                      onChange={handleChange}
                      required
                    />

                  </div>

                </div>


                <div className="leave-form-group">

                  <label htmlFor="toDate">
                    To Date
                    <span>*</span>
                  </label>

                  <div className="date-input-wrapper">

                    <CalendarDays size={16} />

                    <input
                      id="toDate"
                      type="date"
                      name="toDate"
                      value={formData.toDate}
                      onChange={handleChange}
                      min={formData.fromDate || undefined}
                      required
                    />

                  </div>

                </div>

              </div>


              {/* Reason */}

              <div className="leave-form-group">

                <label htmlFor="reason">
                  Reason
                  <span>*</span>
                </label>

                <textarea
                  id="reason"
                  name="reason"
                  value={formData.reason}
                  onChange={handleChange}
                  placeholder="Enter the reason for your leave..."
                  rows="5"
                  maxLength="500"
                  required
                />

                <small>
                  {formData.reason.length}/500
                </small>

              </div>


              {/* Buttons */}

              <div className="leave-form-actions">

                <button
                  type="button"
                  className="leave-cancel-button"
                  onClick={handleCloseForm}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="leave-submit-button"
                >
                  <CheckCircle2 size={16} />
                  Submit Leave
                </button>

              </div>

            </form>

          </div>

        </div>

      )}

    </div>
  );
}

export default Leave;