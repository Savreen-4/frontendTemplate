import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  FaEnvelope,
  FaPhoneAlt,
  FaClock,
  FaBuilding,
  FaUserTie,
  FaGlobe,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";
import { IMAGE_BASE_URL } from "../../../_metronic/helpers/crud-helper/consts";
import './style.scss';
import BackButton from "../../modules/common/BackButton";
import { FetchCompanydetail } from "../../redux/features/companies/companiesAction";
import { toAbsoluteUrl } from "../../../_metronic/helpers";
import { useIntl } from "react-intl";

const CompanyDetail = () => {
  const dispatch: any = useDispatch();
  const { id } = useParams();
  const { formatMessage } = useIntl();
  const { companyDetail } = useSelector((state: any) => state.companiesSlice);

  useEffect(() => {
    if (id) dispatch(FetchCompanydetail({ id }));
  }, [id]);

  const company = companyDetail?.[0];

  if (!company) return <div className="text-center py-5">{formatMessage({ id: 'Loading' })}...</div>;

  return (
    <div className="user-detail-page userWrapper partnersWrapper">

      <BackButton className="mb-4" label={formatMessage({ id: 'Back' })}/>

      <div className="company-detail-container bg-light rounded shadow-sm p-4">
        <div className="d-flex align-items-center gap-4 mb-4">
          <img
            src={company.profilePicture ? `${IMAGE_BASE_URL}${company.profilePicture}` : toAbsoluteUrl("/media/svg/humans/custom-1.svg")}
            alt="Company Profile"
            className="rounded-circle border"
            style={{ width: 100, height: 100, objectFit: 'cover' }}
          />
          <div>
            <h1 className="mb-1">{company.name}</h1>
            <p className="text-muted mb-0"><FaUserTie className="me-2 text-primary" /> {formatMessage({ id: 'Role' })}: <strong>{company.role}</strong></p>
            <p className="text-muted"><FaBuilding className="me-2 text-secondary" /> {formatMessage({ id: 'Type' })}: <strong>{company.companyType}</strong></p>
          </div>
        </div>

        <hr />

        <div className="company-info-grid d-grid gap-3">
          <div className="d-flex align-items-center gap-2">
            <FaEnvelope className="text-primary" />
            <span><strong>{formatMessage({ id: 'Email' })}:</strong> {company.email}</span>
          </div>
          <div className="d-flex align-items-center gap-2">
            <FaPhoneAlt className="text-success" />
            <span><strong>{formatMessage({ id: 'Phone' })}:</strong> {company.countryCode} {company.phone}</span>
          </div>
          <div className="d-flex align-items-center gap-2">
            <FaClock className="text-warning" />
            <span><strong>{formatMessage({ id: 'CreatedAt' })}:</strong> {new Date(company.createdAt).toLocaleString()}</span>
          </div>
          <div className="d-flex align-items-center gap-2">
            <FaGlobe className="text-info" />
            <span><strong>{formatMessage({ id: 'Status' })}:</strong> {company.status === 'active' 
              ? <><FaCheckCircle className="text-success me-1" />{company.status}</>
              : <><FaTimesCircle className="text-danger me-1" />{company.status}</>
            }</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export { CompanyDetail };
