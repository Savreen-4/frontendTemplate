import { useEffect } from "react";
import { SharedTable } from "../../modules/common/table";
import { useDispatch, useSelector } from "react-redux";
import NoDataComponent from "../../modules/common/nodataMessage";
import { useNavigate, useParams } from "react-router-dom";
import { useIntl } from "react-intl";
import { FaEdit, FaPlus } from "react-icons/fa";
import { setConfirmDeleteModal, setDetail } from "../../redux/features/vehicleTypes/vehicleTypesSlice";
import { FetchComapnyJobs } from "../../redux/features/Jobs/jobsAction";

const CompanyJobs = () => {
    const dispatch: any = useDispatch();
    const { formatMessage } = useIntl();
    const navigate = useNavigate();
    const { id } = useParams();
    const headers = [
        "from",
        "to",
        "startTime",
        "pricePerKm",
        "escortVehicle",
        "flatRate",
        "date"
    ];


    const className = "mb-5 mb-xl-8";
    const { companyJobs, usersPerPage, currentPage } = useSelector((state: any) => state.companyJobsSlice);

    useEffect(() => {
        dispatch(FetchComapnyJobs({ page: currentPage, usersPerPage, query: "", id }))
    }, [dispatch, currentPage]);

    const renderActions = (row: any) => (
        <>
            <div className="d-flex align-items-center gap-2">
                <button
                    className="btn btn-sm"
                    onClick={() => editDetail(row)}
                    title="Delete"
                >
                    <FaEdit size={20} />
                </button>

                <button
                    onClick={() => handleDeleteShow(row)}
                    className="btn btn-sm"
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

    return (
        <div>
            <div className={`card ${className}`}>
                <div className="card-header border-0 py-3 align-items-center">
                    <h3 className="card-title align-items-start flex-column">
                        <span className="card-label fw-bold fs-3">{formatMessage({ id: 'Jobs' })}</span>
                    </h3>
                </div>

                {companyJobs && companyJobs?.length > 0 ? (
                    <>
                        <SharedTable
                            headers={headers}
                            data={companyJobs}
                            renderActions={renderActions}
                            getDetail={getDetail}
                            editDetail={editDetail}
                        />
                    </>
                ) : (
                    <NoDataComponent
                        message={formatMessage({ id: 'NoData' })}
                    />
                )}
            </div>

        </div>
    );
};

export { CompanyJobs };
