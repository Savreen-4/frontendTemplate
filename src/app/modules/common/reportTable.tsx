import React from 'react';
import moment from 'moment';
import { FaRegEye } from "react-icons/fa";

const ReportTable = ({ headers, data, onView }) => {
  const capitalizeHeader = (header) => {
    return header
      .replace(/_/g, ' ')
      .replace(/([a-z])([A-Z])/g, '$1 $2')
      .replace(/^./, str => str.toUpperCase());
  };

  const formatDate = (value) => {
    try {
      if (moment(value, moment.ISO_8601, true).isValid()) {
        return moment(value).format('MMM DD, YYYY');
      }
      return value;
    } catch (error) {
      console.error('Error formatting date:', error);
      return value;
    }
  };

  const getCellValue = (row, header) => {
    switch (header) {
      case 'report_by':
        return row.createdBy?.name || '--';

      case 'plan_id':
        return row.event?._id || '--';

      case 'plan_name':
        return row.event?.event_name || '--';

      case 'plan_owner':
        return row.event?.owner?.name || '--';

      case 'community_owner':
        return row.community?.owner?.name || '--';

      case 'community_id':
        return row.community?._id || '--';

      case 'community_name':
        return row.community?.name || '--';

      case 'category':
        return row.category?.name || '--';

      case 'description':
        return row.description || '--';

      case 'created_at':
        return row.createdAt ? formatDate(row.createdAt) : '--';

      case 'status':
        if (row.event) {
          return row.event.eventBanBasedOnReport ?
            <span className="badge bg-danger">Banned</span> :
            <span className="badge bg-success">Active</span>;
        }
        if (row.community) {
          return row.community.communityBanBasedOnReport ?
            <span className="badge bg-danger">Banned</span> :
            <span className="badge bg-success">Active</span>;
        }
        return '--';

      default:
        return row[header] || '--';
    }
  };

  return (
    <div className="card-body py-3">
      <div className="table-responsive">
        <table className="table_wrapper table table-row-bordered table-row-gray-100 align-middle gs-0 gy-3">
          <thead>
            <tr className="fw-bold text-muted">
              {headers.map((header, index) => (
                <th key={index} className="min-w-150px">
                  {capitalizeHeader(header)}
                </th>
              ))}
              <th className="min-w-100px text-end">Actions</th>
            </tr>
          </thead>

          <tbody>
            {data?.map((row) => (
              <tr key={row._id}>
                {headers.map((header, index) => (
                  <td key={index}>
                    {getCellValue(row, header)}
                  </td>
                ))}
                <td className="text-end">
                  <div onClick={() => onView(row)} className="cursor-pointer text-primary">
                    <FaRegEye size={18} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export { ReportTable };
