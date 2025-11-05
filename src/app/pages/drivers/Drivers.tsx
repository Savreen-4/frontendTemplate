import { useEffect } from "react";
import { SharedTable } from "../../modules/common/table";
import { useDispatch, useSelector } from "react-redux";
import NoDataComponent from "../../modules/common/nodataMessage";
import { useNavigate } from "react-router-dom";
import { deleteAccount, FetchDrivers } from "../../redux/features/drivers/driverAction";
import { useIntl } from "react-intl";
import ConfirmationModal from "../../modules/common/SharedConfirmatioModal";
import { setConfirmDeleteModal, setDetail } from "../../redux/features/drivers/driverSlice";

const Drivers = () => {
    const dispatch: any = useDispatch();
    const { formatMessage } = useIntl();
    const navigate = useNavigate();
    const headers = [
        "Image",
        "Name",
        "Phone",
        "Email",
        "VehicleType",
        "ProfileRegistered",
        "ProfileVerified",
        "View",
        "Jobs",
        "Actions"
    ]

    const className = "mb-5 mb-xl-8";
    const { drivers, loading, usersPerPage, currentPage, confirmDeleteModal, driverDetail } = useSelector((state: any) => state.driverSlice);

    useEffect(() => {
        dispatch(FetchDrivers({ page: currentPage, usersPerPage }))
    }, [dispatch, currentPage]);

    const handleDelete = () => {
        dispatch(deleteAccount({ id: driverDetail._id }))
    };

    const handleDeleteShow = (row: any) => {
        dispatch(setConfirmDeleteModal(true))
        dispatch(setDetail(row))
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
        navigate(`/drivers/${row._id}`);
    };

    const editDetail = (row: any) => {

    };

    return (
        <div>
            <div className={`card ${className}`}>
                <div className="card-header border-0 py-3 align-items-center">
                    <h3 className="card-title align-items-start flex-column">
                        <span className="card-label fw-bold fs-3">{formatMessage({ id: 'Drivers' })}</span>
                    </h3>
                </div>

                {drivers && drivers?.length > 0 ? (
                    <>
                        <SharedTable
                            headers={headers}
                            data={drivers}
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
                        message="No data available at the moment."
                    />
                )}
            </div>

            <ConfirmationModal
                show={confirmDeleteModal}
                onHide={() => dispatch(setConfirmDeleteModal(false))}
                onConfirm={handleDelete}
                title={formatMessage({ id: 'DeleteDriver' })}
                message={formatMessage({ id: 'delete_cnfrm_message' })}
                confirmText={formatMessage({ id: 'Delete' })}
                cancelText={formatMessage({ id: 'Cancel' })}
                buttonColor={"#dc3545"}
            />

        </div>
    );
};

export { Drivers };
