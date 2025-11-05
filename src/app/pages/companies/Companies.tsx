import { useEffect } from "react";
import { SharedTable } from "../../modules/common/table";
import { useDispatch, useSelector } from "react-redux";
import NoDataComponent from "../../modules/common/nodataMessage";
import {
    deleteAccount,
    FetchCompanies,
} from "../../redux/features/companies/companiesAction";
import { useNavigate } from "react-router-dom";
import "./style.scss";
import { useIntl } from "react-intl";
import { setConfirmDeleteModal, setDetail } from "../../redux/features/companies/companiesSlice";
import ConfirmationModal from "../../modules/common/SharedConfirmatioModal";

const Companies = () => {
    const dispatch: any = useDispatch();
    const navigate = useNavigate();
    const { formatMessage } = useIntl();
    const { companies, currentPage, usersPerPage, confirmDeleteModal, companyDetail, loading } = useSelector((state: any) => state.companiesSlice);
    const className = "mb-5 mb-xl-8";
    const headers = [
        "Image",
        "Name",
        "Phone",
        "Email",
        "ProfileRegistered",
        "View",
        "Jobs",
        "Actions"
    ]

    useEffect(() => {
        dispatch(FetchCompanies({ page: currentPage, usersPerPage }));
    }, [dispatch, currentPage]);

    const handleDeleteShow = (row: any) => {
        dispatch(setConfirmDeleteModal(true))
        dispatch(setDetail(row))
    };

    const handleDelete = () => {
        dispatch(deleteAccount({ id: companyDetail._id }))
    };

    const renderActions = (row: any) => (
        <>
            <div className="d-flex align-items-center gap-2">
                <button
                    onClick={() => handleDeleteShow(row)}
                    className="btn btn-sm"
                    title="Delete"
                >
                    <i className="bi bi-trash-fill text-danger fs-5"></i>
                </button>
            </div>
        </>
    );

    const getDetail = (row: any) => {
        navigate(`/companies/${row._id}`);
    };

    const editDetail = (row: any) => {
        navigate(`/partners/edit/${row._id}`);
    };

    const formattedUsers = companies?.length
        ? companies.map(user => ({
            ...user,
            phoneNumber: user.countryCode && user.phoneNumber
                ? `${user.countryCode} ${user.phoneNumber}`
                : user.phoneNumber || '',
        })) : [];

    return (
        <div>
            <div className={`card ${className}`}>
                <div className="card-header border-0 py-3 align-items-center">
                    <h3 className="card-title align-items-start mb-0 mt-0 flex-column">
                        <span className="card-label fw-bold fs-3 ">{formatMessage({ id: 'Companies' })}</span>
                    </h3>
                </div>

                {companies && companies?.length > 0 ? (
                    <>
                        <SharedTable
                            headers={headers}
                            data={formattedUsers}
                            renderActions={renderActions}
                            getDetail={getDetail}
                            editDetail={editDetail}
                        />
                    </>
                ) : (loading) ? (
                    <div className="d-flex justify-content-center align-items-center vh-100">
                        <div className="spinner-border text-primary" role="status" style={{ width: "3rem", height: "3rem" }}>
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                ) : (
                    <NoDataComponent
                        message="No partners available at the moment."
                    />
                )}
            </div>

            <ConfirmationModal
                show={confirmDeleteModal}
                onHide={() => dispatch(setConfirmDeleteModal(false))}
                onConfirm={handleDelete}
                title={formatMessage({ id: 'DeleteCompany' })}
                message={formatMessage({ id: 'delete_cnfrm_message' })}
                confirmText={formatMessage({ id: 'Delete' })}
                cancelText={formatMessage({ id: 'Cancel' })}
                buttonColor={"#dc3545"}
            />

        </div>
    );
};

export { Companies };
