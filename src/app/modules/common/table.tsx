import React, { useState, useMemo } from "react";
import DataTable from "react-data-table-component";
import moment from "moment";
import { FaExternalLinkAlt, FaEye, FaInfoCircle } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { IMAGE_BASE_URL } from '../../../_metronic/helpers/crud-helper/consts';
import { toAbsoluteUrl } from "../../../_metronic/helpers";
import { useDispatch } from "react-redux";
import { useIntl } from "react-intl";
import { dateFormater } from "../../utlis/helper";

const SharedTable = ({ headers, data, renderActions, getDetail, editDetail }) => {
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [dateField, setDateField] = useState("createdAt");
  const { formatMessage } = useIntl();
  const navigate = useNavigate();
  const nonSortableHeaders = ["Icon", "Image", "View", "Jobs", "Actions", "CreatedAt", "ProfileRegistered", "ProfileVerified"];

  const formatDate = (value) => {
    try {
      if (moment(value).isValid()) {
        const formatStr = location.pathname === "/notifications" ? "MMM DD, YYYY hh:mm A" : "MMM DD, YYYY";
        return moment(value).format(formatStr);
      }
      return value;
    } catch {
      return value;
    }
  };

  function capitalizeFirstLetter(str) {
    if (typeof str !== 'string' || !str.length) return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  const getConnectedJobs = (row: any) => {
    let locationPath = location.pathname?.split('/')
    if (locationPath[1] === 'companies') {
      navigate(`/companies/jobs/${row._id}`);
    }
    if (locationPath[1] === 'drivers') {
      navigate(`/drivers/jobs/${row._id}`);
    }
  };

  const cellHandlers = {
    Image: (row) => (
      <img
        src={
          row.profilePicture
            ? `${IMAGE_BASE_URL}${row.profilePicture}`
            : toAbsoluteUrl("/media/svg/humans/custom-1.svg")
        }
        alt="User"
        className="rounded-circle border shadow-sm"
        style={{ width: "35px", height: "35px", objectFit: "cover" }}
      />
    ),

    Icon: (row) => (
      <img
        src={
          row.icon
            ? `${IMAGE_BASE_URL}${row.icon}`
            : toAbsoluteUrl("/media/svg/humans/custom-1.svg")
        }
        alt="User"
        className="rounded-circle border shadow-sm"
        style={{ width: "35px", height: "35px", objectFit: "cover" }}
      />
    ),

    View: (row) => <FaEye title="View Details" style={{ cursor: 'pointer' }} size={20} onClick={() => getDetail(row)} />,

    Jobs: (row) => <FaExternalLinkAlt title="View Jobs" style={{ cursor: 'pointer' }} size={15} onClick={() => getConnectedJobs(row)} />,

    Phone: (row) => row?.phone ? row?.phone : "--",
    Email: (row) => row?.email ? row?.email : "--",
    Name: (row) => row?.name ? capitalizeFirstLetter(row?.name) : "--",

    VehicleType: (row) => row?.vehicleType?.name ?? "--",

    ProfileRegistered: (row) => (
      <span
        className={`badge px-3 py-2 fw-bold ${row?.isBlocked ? 'bg-danger' : 'bg-success'}`}
        style={{ fontSize: '0.85rem' }}
      >
        {row?.isProfileRegistered ? 'Registered' : 'Not Registered'}
      </span>
    ),

    ProfileVerified: (row) => (
      <span
        className={`badge px-3 py-2 fw-bold ${row?.isBlocked ? 'bg-danger' : 'bg-success'}`}
        style={{ fontSize: '0.85rem' }}
      >
        {row?.isProfileVerified ? 'Verified' : 'Not Verified'}
      </span>
    ),

    from: (row) => row?.from ? row?.from : (row?.job?.from) ? row?.job?.from : "--",
    to: (row) => row?.job?.to ? row?.job?.to : row.to ? row.to : "--",
    startTime: (row) => row?.job?.startTime ? row?.job?.startTime : row.startTime ? row.startTime : "--",
    flatRate: (row) => row?.flatRate ? `${row.flatRate ?? "--"} $` : (row?.job?.flatRate) ? `${row?.job?.flatRate ?? "--"} $` : "--",
    date: (row) => row.date ? formatDate(row.date) : (row?.job?.date) ? formatDate(row?.job?.date) : "--",
    pricePerKm: (row) => row?.job?.pricePerKm ? `${row?.job?.pricePerKm ?? "--"} $` : row.pricePerKm ? `${row.pricePerKm ?? "--"} $` : "--",
    escortVehicle: (row) => row.escortVehicle?.name ? capitalizeFirstLetter(row.escortVehicle?.name) : "--",
    companyName: (row) => row?.companyDetail?.name ?? "--",
    type: (row) => row?.type ? capitalizeFirstLetter(row?.type) : "--",
    CreatedAt: (row) => dateFormater(row?.createdAt) ?? "--",
    Actions: (row) => renderActions(row) ?? "--",
    status: (row) => row?.status ? capitalizeFirstLetter(row?.status) : "--",
    Message: (row) => row?.message ?? "--",
  };

  const getCellContent = (row, headerId) => {
    if (headerId && cellHandlers[headerId]) {
      return cellHandlers[headerId](row);
    }
    const val = row[headerId];
    return moment(val).isValid() ? formatDate(val) : val ?? "--";
  };

  const extractSortValue = (row, header) => {
    switch (header) {
      case "Name":
        return row?.name?.toLowerCase() ?? '';
      case "Phone":
        return row?.phone ?? '';
      case "Email":
        return row?.email ?? '';
      case "VehicleType":
        return row?.vehicleType?.name ?? '';
      case "ProfileRegistered":
        return row?.isProfileRegistered ?? false;
      case "ProfileVerified":
        return row?.isProfileVerified ?? false;
      case "CreatedAt":
        return row?.createdAt ?? '';
      default:
        return row[header] ?? '';
    }
  };

  const columns = headers.map((header) => {
    const isSortable = !nonSortableHeaders.includes(header);
    return {
      name:
      (
        <div
          className="justify"
          style={
            !isSortable
              ? {
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "100%",
                  minWidth:'120px'
                }
              : {}
          }
        >
          {header === "Amount"
            ? `${formatMessage({ id: "Amount" })} (₱)`
            : formatMessage({ id: header })}
        </div>
      ),
        // header === "Amount"
        //   ? `${formatMessage({ id: "Amount" })} ($)`
        //   : formatMessage({ id: header }),
      cell: (row) => getCellContent(row, header),
      sortable: isSortable,
      wrap: true,
      sortFunction: isSortable
        ? (a, b) => {
            const valA = extractSortValue(a, header);
            const valB = extractSortValue(b, header);

            if (valA === valB) return 0;
            if (valA == null) return 1;
            if (valB == null) return -1;

            if (typeof valA === "string" && typeof valB === "string") {
              return valA.localeCompare(valB);
            }

            return valA > valB ? 1 : -1;
          }
        : undefined,
    };
  });

  const filteredData = useMemo(() => {
    return data.filter((row) => {
      const matchesSearch = headers.some((header) => {
        const content = getCellContent(row, header);
        const text = typeof content === "string" ? content : content?.props?.children ?? "";
        return String(text).toLowerCase().includes(searchTerm.toLowerCase());
      });

      const rowDate = row[dateField] ? moment(row[dateField]) : null;
      const matchesStartDate = startDate ? rowDate?.isSameOrAfter(moment(startDate), 'day') : true;
      const matchesEndDate = endDate ? rowDate?.isSameOrBefore(moment(endDate), 'day') : true;

      return matchesSearch && matchesStartDate && matchesEndDate;
    });
  }, [data, searchTerm, headers, startDate, endDate, dateField]);

  return (
    <div className="card-body py-3">
      <div className="row align-items-end mb-3">
        <div className="col-md-3">
          <label htmlFor="searchInput" className="form-label fw-bold">
            {formatMessage({ id: 'Search' })}
          </label>
          <div className="input-group">
            <input
              type="text"
              id="searchInput"
              className="form-control"
              placeholder={formatMessage({ id: 'SearchPlaceholder' })}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <span className="input-group-text">
              <i className="fas fa-search" />
            </span>
          </div>
        </div>
      </div>

      <DataTable
        columns={columns}
        data={filteredData}
        pagination
        highlightOnHover
        responsive
        persistTableHead
        striped
        noHeader={false}
        defaultSortFieldId={null} // Disable default sorting
      />
    </div>
  );
};

export { SharedTable };
