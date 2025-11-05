import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FetchDashboardData } from "../../redux/features/dashboard/dashbaordAction";
import { useIntl } from "react-intl";

const DashboardWrapper = () => {
  const dispatch: any = useDispatch();
  const { formatMessage } = useIntl();
  const { dashboard } = useSelector((state: any) => state.dashboardSlice);
  const [dashboardCounts, setDashboardCounts] = useState({
    drivers: 0,
    verifiedDrivers: 0,
    companies: 0,
    jobs: 0,
    jobAssignments: 0,
    jobRequests: 0,
  });

  useEffect(() => {
    dispatch(FetchDashboardData());
  }, [dispatch]);

  useEffect(() => {
    if (dashboard) {
      setDashboardCounts({
        drivers: dashboard.drivers || 0,
        verifiedDrivers: dashboard.verifiedDrivers || 0,
        companies: dashboard.companies || 0,
        jobs: dashboard.jobs || 0,
        jobAssignments: dashboard.jobAssignments || 0,
        jobRequests: dashboard.jobRequests || 0,
      });
    }
  }, [dashboard]);

  const cardData = [
    { label: formatMessage({ id: "totalDrivers" }), value: dashboardCounts.drivers, bgClass: "bg-primary" },
    { label: formatMessage({ id: "verifiedDrivers" }), value: dashboardCounts.verifiedDrivers, bgClass: "bg-success" },
    { label: formatMessage({ id: "totalCompanies" }), value: dashboardCounts.companies, bgClass: "bg-warning text-dark" },
    { label: formatMessage({ id: "totalJobs" }), value: dashboardCounts.jobs, bgClass: "bg-info" },
    { label: formatMessage({ id: "jobAssignments" }), value: dashboardCounts.jobAssignments, bgClass: "bg-danger" },
    { label: formatMessage({ id: "jobRequests" }), value: dashboardCounts.jobRequests, bgClass: "bg-secondary" },
  ];

  return (
    <div className="container my-5">
      <h2 className="text-xl font-semibold mb-6">{formatMessage({ id: "dashboardCounts" })}</h2>
      {/* <h2 className="mb-4 text-center fw-bold">Dashboard Counts</h2> */}
      <div className="row g-4">
        {cardData.map(({ label, value, bgClass }) => (
          <div key={label} className="col-12 col-sm-6 col-md-4">
            <div
              className={`${bgClass} text-white shadow rounded p-4 d-flex flex-column align-items-center justify-content-center`}
              style={{ minHeight: "150px", cursor: "default", transition: "transform 0.3s" }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.transform = "scale(1.05)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.transform = "scale(1)";
              }}
            >
              <p className="mb-2 text-uppercase fw-semibold" style={{ letterSpacing: "1.2px" }}>
                {label}
              </p>
              <h3 className="display-4 fw-bold">{value}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardWrapper;
