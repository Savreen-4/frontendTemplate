import { useEffect } from "react";
import { SharedTable } from "../../modules/common/table";
import { useDispatch, useSelector } from "react-redux";
import NoDataComponent from "../../modules/common/nodataMessage";
import { useNavigate } from "react-router-dom";
import { useIntl } from "react-intl";
import { deleteVehicleType, FetchVehicleTypes } from "../../redux/features/vehicleTypes/vehicleTypesAction";
import { FaEdit, FaPlus } from "react-icons/fa";
import ConfirmationModal from "../../modules/common/SharedConfirmatioModal";
import { setConfirmDeleteModal, setDetail } from "../../redux/features/vehicleTypes/vehicleTypesSlice";
import "./style.scss";

const VehicleType = () => {
    const dispatch: any = useDispatch();
    const { formatMessage } = useIntl();
    const navigate = useNavigate();
    const headers = [
        "Icon",
        "Name",
        "CreatedAt",
        "Actions",
    ];

    const className = "mb-5 mb-xl-8";
    const { loading, vehicleTypes, pagination, usersPerPage, currentPage, confirmDeleteModal, vehicleDetail } = useSelector((state: any) => state.vehicleTypesSlice);
    const totalPages = Math.ceil(pagination?.totalRecords / usersPerPage);

    useEffect(() => {
        dispatch(FetchVehicleTypes({ page: currentPage, usersPerPage }))
    }, [dispatch, currentPage]);

    const addVehicleType = () => {
        dispatch(setDetail({}));
        navigate(`/vehicleTypes/add`);
    };

    const renderActions = (row: any) => (
        <>
            <div className="d-flex align-items-center gap-2">
                <button
                    className="btn btn-sm"
                    onClick={() => editDetail(row)}
                    title="Edit"
                >
                    <FaEdit size={20} />
                </button>

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
        dispatch(setDetail(row));
        navigate(`/vehicleTypes/${row?._id}`);
    };

    const handleDeleteShow = (row: any) => {
        dispatch(setConfirmDeleteModal(true))
        dispatch(setDetail(row))
    };

    const handleDelete = () => {
        console.log('row==>>>', vehicleDetail);
        dispatch(deleteVehicleType({ id: vehicleDetail._id }))
        // dispatch(setConfirmDeleteModal(true))
    };

    return (
        <div>
            <div className={`card ${className}`}>
                <div className="card-header border-0 py-3 align-items-center">
                    <h3 className="card-title align-items-start flex-column">
                        <span className="card-label fw-bold fs-3">{formatMessage({ id: 'Vehicle_Types' })}</span>
                    </h3>
                    <button className="btn theme-color text-white" style={{ fontWeight: 600 }} onClick={addVehicleType}>
                        <FaPlus className="me-2" /> {formatMessage({ id: 'Vehicle_Types' })}
                    </button>
                </div>

                {vehicleTypes && vehicleTypes?.length > 0 ? (
                    <>
                        <SharedTable
                            headers={headers}
                            data={vehicleTypes}
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
                        message={formatMessage({ id: 'NoData' })}
                    />
                )}
            </div>

            <ConfirmationModal
                show={confirmDeleteModal}
                onHide={() => dispatch(setConfirmDeleteModal(false))}
                onConfirm={handleDelete}
                title={formatMessage({ id: 'DeleteVehicle' })}
                message={formatMessage({ id: 'delete_cnfrm_message' })}
                confirmText={formatMessage({ id: 'Delete' })}
                cancelText={formatMessage({ id: 'Cancel' })}
                buttonColor={"#dc3545"}
            />

        </div>
    );
};

export { VehicleType };
