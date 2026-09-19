import {
  IndianRupee,
  CreditCard,
  Clock3,
  CheckCircle2,
  Receipt,
  CalendarDays,
  WalletCards,
} from "lucide-react";

import "./Fees.css";

import { useEffect, useState } from "react";
import api from "../../services/api";

function Fees() {
  /*
    Backend integration ready.

    Expected API response:

    {
      "totalFee": 0,
      "paidAmount": 0,
      "pendingAmount": 0,

      "feeDetails": [
        {
          "id": 1,
          "feeType": "Tuition Fee",
          "amount": 0,
          "paidAmount": 0,
          "pendingAmount": 0,
          "dueDate": "2026-09-10",
          "status": "PENDING"
        }
      ],

      "paymentHistory": [
        {
          "id": 1,
          "transactionId": "TXN001",
          "amount": 0,
          "paymentDate": "2026-09-01",
          "paymentMode": "Online"
        }
      ]
    }

    No dummy data.
  */

  const [feesData, setFeesData] = useState(null);
  useEffect(() => {
  const fetchFees = async () => {
    try {
      const student = JSON.parse(localStorage.getItem("student"));

      if (!student?.studentId || !student?.semester) {
        return;
      }

      const response = await api.get(
        `/fee-details/${student.studentId}/${student.semester}`
      );

      const feeDetails = response.data.map((fee) => ({
        ...fee,
        feeType: "Semester Fee",
        amount: fee.totalFee,
        paidAmount: fee.paidFee,
        pendingAmount: fee.pendingFee,
      }));

      const totalFee = feeDetails.reduce(
        (sum, fee) => sum + (fee.totalFee || 0),
        0
      );

      const paidAmount = feeDetails.reduce(
        (sum, fee) => sum + (fee.paidFee || 0),
        0
      );

      const pendingAmount = feeDetails.reduce(
        (sum, fee) => sum + (fee.pendingFee || 0),
        0
      );

      const paymentsResponse = await api.get(
  `/payments/${student.studentId}`
);

setFeesData({
  totalFee,
  paidAmount,
  pendingAmount,
  feeDetails,
  paymentHistory: paymentsResponse.data,
});
    } catch (error) {
      console.error("Failed to load fees:", error);
    }
  };

  fetchFees();
}, []);

  const feeDetails = feesData?.feeDetails ?? [];
  const paymentHistory = feesData?.paymentHistory ?? [];


  const formatAmount = (amount) => {
    if (amount === null || amount === undefined) {
      return "--";
    }

    return `₹${Number(amount).toLocaleString("en-IN")}`;
  };


  const getStatusClass = (status) => {
    switch (status?.toUpperCase()) {
      case "PAID":
        return "fee-status-paid";

      case "PENDING":
        return "fee-status-pending";

      case "OVERDUE":
        return "fee-status-overdue";

      default:
        return "fee-status-default";
    }
  };


  const getStatusIcon = (status) => {
    switch (status?.toUpperCase()) {
      case "PAID":
        return <CheckCircle2 size={14} />;

      case "PENDING":
        return <Clock3 size={14} />;

      default:
        return <Receipt size={14} />;
    }
  };


  return (
    <div className="fees-page">

      {/* ========================================
          Header
      ======================================== */}

      <div className="fees-header">

        <div>
          <h1>Fees</h1>

          <p>
            View your fee details and payment history.
          </p>
        </div>

        <div className="fees-header-icon">
          <WalletCards size={22} />
        </div>

      </div>


      {/* ========================================
          Fee Summary
      ======================================== */}

      <div className="fee-summary">

        {/* Total Fee */}

        <div className="fee-summary-card">

          <div className="fee-summary-icon total-fee">
            <IndianRupee size={20} />
          </div>

          <div className="fee-summary-content">

            <span>
              Total Fee
            </span>

            <strong>
              {formatAmount(feesData?.totalFee)}
            </strong>

          </div>

        </div>


        {/* Paid */}

        <div className="fee-summary-card">

          <div className="fee-summary-icon paid-fee">
            <CheckCircle2 size={20} />
          </div>

          <div className="fee-summary-content">

            <span>
              Paid Amount
            </span>

            <strong>
              {formatAmount(feesData?.paidAmount)}
            </strong>

          </div>

        </div>


        {/* Pending */}

        <div className="fee-summary-card">

          <div className="fee-summary-icon pending-fee">
            <Clock3 size={20} />
          </div>

          <div className="fee-summary-content">

            <span>
              Pending Amount
            </span>

            <strong>
              {formatAmount(feesData?.pendingAmount)}
            </strong>

          </div>

        </div>

      </div>


      {/* ========================================
          Fee Details
      ======================================== */}

      <section className="fees-card">

        <div className="fees-card-header">

          <div className="fees-title">

            <div className="fees-title-icon">
              <Receipt size={19} />
            </div>

            <div>
              <h3>Fee Details</h3>

              <p>
                View your semester fee details.
              </p>
            </div>

          </div>

        </div>


        {feeDetails.length > 0 ? (

          <div className="fee-details-list">

            {feeDetails.map((fee) => (

              <div
                className="fee-detail-item"
                key={fee.id}
              >

                {/* Fee Type */}

                <div className="fee-type">

                  <div className="fee-type-icon">
                    <Receipt size={17} />
                  </div>

                  <div>

                    <h4>
                      {fee.feeType}
                    </h4>

                    <span>
                      Fee Category
                    </span>

                  </div>

                </div>


                {/* Amount */}

                <div className="fee-amount">

                  <span>
                    Total Amount
                  </span>

                  <strong>
                    {formatAmount(fee.amount)}
                  </strong>

                </div>


                {/* Paid */}

                <div className="fee-amount">

                  <span>
                    Paid
                  </span>

                  <strong className="paid-text">
                    {formatAmount(fee.paidAmount)}
                  </strong>

                </div>


                {/* Pending */}

                <div className="fee-amount">

                  <span>
                    Pending
                  </span>

                  <strong className="pending-text">
                    {formatAmount(fee.pendingAmount)}
                  </strong>

                </div>


                {/* Due Date */}

                <div className="fee-due">

                  <span>
                    <CalendarDays size={13} />
                    Due Date
                  </span>

                  <strong>
                    {fee.dueDate ?? "--"}
                  </strong>

                </div>


                {/* Status */}

                <div
                  className={`fee-status ${getStatusClass(
                    fee.status
                  )}`}
                >
                  {getStatusIcon(fee.status)}

                  <span>
                    {fee.status ?? "--"}
                  </span>
                </div>

              </div>

            ))}

          </div>

        ) : (

          <div className="fees-empty">

            <div className="fees-empty-icon">
              <Receipt size={27} />
            </div>

            <h4>
              No fee details available
            </h4>

            <p>
              Your fee details will appear here
              once they are provided by the college.
            </p>

          </div>

        )}

      </section>


      {/* ========================================
          Payment History
      ======================================== */}

      <section className="fees-card payment-card">

        <div className="fees-card-header">

          <div className="fees-title">

            <div className="payment-title-icon">
              <CreditCard size={19} />
            </div>

            <div>
              <h3>Payment History</h3>

              <p>
                View your previous fee payments.
              </p>
            </div>

          </div>

        </div>


        {paymentHistory.length > 0 ? (

          <div className="payment-table-wrapper">

            <table className="payment-table">

              <thead>

                <tr>
                  <th>Transaction ID</th>
                  <th>Amount</th>
                  <th>Payment Date</th>
                  <th>Payment Mode</th>
                  <th>Status</th>
                </tr>

              </thead>

              <tbody>

                {paymentHistory.map((payment) => (

                  <tr key={payment.id}>

                    <td>
                      <span className="transaction-id">
                        {payment.transactionId ?? "--"}
                      </span>
                    </td>

                    <td>
                      <strong className="payment-amount">
                        {formatAmount(payment.amount)}
                      </strong>
                    </td>

                    <td>
                      {payment.paymentDate ?? "--"}
                    </td>

                    <td>
                      {payment.paymentMode ?? "--"}
                    </td>

                    <td>

                      <span className="payment-success">
                        <CheckCircle2 size={13} />

                        Paid
                      </span>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        ) : (

          <div className="payment-empty">

            <div className="payment-empty-icon">
              <CreditCard size={27} />
            </div>

            <h4>
              No payment history available
            </h4>

            <p>
              Your fee payment transactions will
              appear here once available.
            </p>

          </div>

        )}

      </section>

    </div>
  );
}

export default Fees;