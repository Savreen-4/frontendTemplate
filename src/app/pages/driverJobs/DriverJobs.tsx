import { useEffect } from "react";
import { SharedTable } from "../../modules/common/table";
import { useDispatch, useSelector } from "react-redux";
import NoDataComponent from "../../modules/common/nodataMessage";
import { useNavigate, useParams } from "react-router-dom";
import { useIntl } from "react-intl";
import { setDetail } from "../../redux/features/vehicleTypes/vehicleTypesSlice";
import { FetchDriverJobs } from "../../redux/features/Jobs/jobsAction";

const DriverJobs = () => {
    const dispatch: any = useDispatch();
    const { formatMessage } = useIntl();
    const navigate = useNavigate();
    const { id } = useParams();
    const headers = [
        "status",
        "date",
        "companyName",
        "flatRate",
        "type",
        "from",
        "to",
        "startTime",
        "pricePerKm",
      ];

    const className = "mb-5 mb-xl-8";
    const { driverJobs, usersPerPage, currentPage } = useSelector((state: any) => state.driverJobsSlice);

    useEffect(() => {
        dispatch(FetchDriverJobs({ page: currentPage, usersPerPage, query: "", id }))
    }, [dispatch, currentPage]);

    const renderActions = (row: any) => (
        <>

        </>
    );


    const getDetail = (row: any) => {
        navigate(`/drivers/${row._id}`);
    };

    const editDetail = (row: any) => {
        dispatch(setDetail(row));
        navigate(`/vehicleTypes/${row?._id}`);
    };

    return (
        <div>
            <div className={`card ${className}`}>
                <div className="card-header border-0 py-3 align-items-center">
                    <h3 className="card-title align-items-start flex-column">
                        <span className="card-label fw-bold fs-3">{formatMessage({ id: 'Jobs' })}</span>
                    </h3>
                </div>

                {driverJobs && driverJobs?.length > 0 ? (
                    <>
                        <SharedTable
                            headers={headers}
                            data={driverJobs}
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

export { DriverJobs };
