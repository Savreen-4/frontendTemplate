import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  FaEnvelope,
  FaPhoneAlt,
  FaIdCard,
  FaUser,
  FaCarSide,
  FaCheckCircle,
  FaTimesCircle,
  FaBirthdayCake,
  FaClock,
} from "react-icons/fa";
import { IMAGE_BASE_URL } from "../../../_metronic/helpers/crud-helper/consts";
import { FetchDriverdetail, verifyAccount } from "../../redux/features/drivers/driverAction";
import "./style.scss";
import BackButton from "../../modules/common/BackButton";
import { toAbsoluteUrl } from "../../../_metronic/helpers";
import AccountVerificationModal from "../../modules/common/AccountVerificationModal";
import { confirmAccountVerificationModal } from "../../redux/features/drivers/driverSlice";
import { useIntl } from "react-intl";

const DriverDetail = () => {
  const dispatch: any = useDispatch();
  const navigate: any = useNavigate();
  const { formatMessage } = useIntl();
  const { id } = useParams();
  const { driverDetail, confirmAccountVerification } = useSelector((state: any) => state.driverSlice);

  useEffect(() => {
    if (id) dispatch(FetchDriverdetail({ id }));
  }, [id]);

  if (!driverDetail) return <div className="text-center py-5">{formatMessage({ id: 'Loading' })}...</div>;

  const {
    name,
    profilePicture,
    gender,
    dob,
    phone,
    countryCode,
    alternatePhone,
    email,
    address,
    language,
    licenceNo,
    role,
    isProfileRegistered,
    isProfileVerified,
    documents,
    createdAt,
  } = driverDetail;

  const handleVerifyAccount = () => {
    let driverId = driverDetail._id;
    dispatch(confirmAccountVerificationModal(true));
  };

  const confirmVerifyAccount = () => {
    let driverId = driverDetail._id;
    dispatch(verifyAccount({ id: driverId, navigate: navigate }));
  };

  return (
    <>
      <div className="user-detail-page p-4 mx-auto userWrapper partnersWrapper">
        <BackButton className="mb-4" label={formatMessage({ id: 'Back' })} />

        <div className="driver-detail-card bg-light rounded shadow-sm p-4">
          {/* Profile Section */}
          <div className="d-flex align-items-center gap-4 mb-4">
            <img
              src={profilePicture ? `${IMAGE_BASE_URL}${profilePicture}` : toAbsoluteUrl("/media/svg/humans/custom-1.svg")}
              alt={name}
              className="rounded-circle border"
              style={{ width: 100, height: 100, objectFit: 'cover' }}
            />
            <div>
              <h1 className="mb-1">{name}</h1>
              <p className="text-muted mb-1"><FaUser className="me-2 text-primary" /> {formatMessage({ id: 'Role' })}: <strong>{role}</strong></p>
              <p className="text-muted"><FaBirthdayCake className="me-2 text-secondary" /> {formatMessage({ id: 'DOB' })}: <strong>{dob ? new Date(dob).toLocaleDateString() : '-'}</strong></p>
            </div>
          </div>

          <hr />

          {/* Contact & Meta Info in grid */}
          <div className="driver-info-grid d-grid gap-3">
            {/* Contact Info */}
            <div className="d-flex align-items-center gap-2">
              <FaEnvelope className="text-primary" />
              <span><strong>{formatMessage({ id: 'Email' })}:</strong> {email || '-'}</span>
            </div>
            <div className="d-flex align-items-center gap-2">
              <FaPhoneAlt className="text-success" />
              <span><strong>{formatMessage({ id: 'Phone' })}:</strong> {countryCode} {phone}</span>
            </div>
            {alternatePhone && (
              <div className="d-flex align-items-center gap-2">
                <FaPhoneAlt className="text-info" />
                <span><strong>{formatMessage({ id: 'Alternate' })}:</strong> {alternatePhone}</span>
              </div>
            )}
            {address && (
              <div className="d-flex align-items-center gap-2">
                <FaIdCard className="text-warning" />
                <span><strong>{formatMessage({ id: 'Address' })}:</strong> {address}</span>
              </div>
            )}

            {/* Meta Info */}
            <div className="d-flex align-items-center gap-2">
              <FaCarSide className="text-secondary" />
              <span><strong>{formatMessage({ id: 'Licence No' })}:</strong> {licenceNo || '-'}</span>
            </div>
            <div className="d-flex align-items-center gap-2">
              {isProfileRegistered
                ? <FaCheckCircle className="text-success me-1" />
                : <FaTimesCircle className="text-danger me-1" />}
              <strong>{formatMessage({ id: 'Profile Registered' })}</strong>
            </div>
            <div className="d-flex align-items-center gap-2">
              {isProfileVerified
                ? <FaCheckCircle className="text-success me-1" />
                : <FaTimesCircle className="text-warning me-1" />}
              <strong>{formatMessage({ id: 'Profile Verified' })}</strong>
            </div>
            <div className="d-flex align-items-center gap-2">
              <FaClock className="text-muted" />
              <span><strong>{formatMessage({ id: 'Created' })}:</strong> {createdAt ? new Date(createdAt).toLocaleString() : '-'}</span>
            </div>
          </div>

          {/* Documents Section */}
          <div className="documents-section mt-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h4>{formatMessage({ id: 'Uploaded Documents' })}</h4>
              {(!isProfileVerified && documents?.length > 0) && (
                <button
                  className="btn btn-sm btn-primary"
                  onClick={handleVerifyAccount}
                >
                  {formatMessage({ id: 'Verify Account' })}
                </button>
              )}
            </div>

            {documents?.length > 0 ? (
              <div className="docs-thumbnails d-flex gap-3 flex-wrap">
                {documents.map((doc: any) => (
                  <div key={doc._id} className="doc-item text-center">
                    {/\.(pdf|docx?|xlsx?|pptx?)$/i.test(doc.value) ? (
                      <div className="doc-preview">
                        <svg xmlns="http://www.w3.org/2000/svg" className="doc-icon" viewBox="0 0 24 24" fill="currentColor" width="40">
                          <path d="M14 2H6a2 2 0 0 0-2 2v16c0 1.103.897 2 2 2h12a2 2 0 0 0 2-2V8l-6-6zM6 20V4h7v5h5v11H6z" />
                          <path d="M8 12h8v2H8zm0 4h8v2H8z" />
                        </svg>
                        <a
                          href={`${IMAGE_BASE_URL}${doc.value}`}
                          target="_blank"
                          rel="noreferrer"
                          className="doc-link d-block mt-1"
                        >
                          {formatMessage({ id: 'View' })} {doc.key}
                        </a>
                      </div>
                    ) : (
                      <div className="doc-preview">
                        <img
                          src={`${IMAGE_BASE_URL}${doc.value}`}
                          alt={doc.key}
                          className="doc-thumbnail rounded"
                          style={{ maxWidth: 80, maxHeight: 80, objectFit: 'cover' }}
                        />
                        <p className="mt-1">{doc.key}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted">{formatMessage({ id: 'NoDocumentsUploaded' })}</p>
            )}
          </div>
        </div>


        {/* Account Verification Modal */}
        <AccountVerificationModal
          show={confirmAccountVerification}
          onHide={() => dispatch(confirmAccountVerificationModal(false))}
          onConfirm={confirmVerifyAccount}
          title={formatMessage({ id: 'VerifyAccount' })}
          message={formatMessage({ id: 'VerifyAccountMessage' })}
          confirmText={formatMessage({ id: 'Verify' })}
          cancelText={formatMessage({ id: 'Cancel' })}
          buttonColor={"#1558CB"}
        />
      </div>
    </>
  );
};

export { DriverDetail };

