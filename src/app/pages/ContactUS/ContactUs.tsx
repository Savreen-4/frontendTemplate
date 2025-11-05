import { useEffect } from "react";
import { SharedTable } from "../../modules/common/table";
import { useDispatch, useSelector } from "react-redux";
import NoDataComponent from "../../modules/common/nodataMessage";
import { FetchContactUSListing } from "../../redux/Contactus/contactusAction";
import { socket } from "../../utlis/socketInstance";

const ContactUs = () => {
    const dispatch: any = useDispatch();
    const headers = ["Name", "Email", "Phone", "CreatedAt", "Message"];
    const className = "mb-5 mb-xl-8";
    const { contactus, pagination, currentPage, usersPerPage, loading } = useSelector((state: any) => state.contactusSlice);
    const totalPages = Math.ceil(pagination?.totalRecords / usersPerPage);

    useEffect(() => {
        dispatch(FetchContactUSListing({ page: currentPage, usersPerPage }))
    }, [dispatch, currentPage]);

    const renderActions = (row: any) => (
        <>
        </>
    );
    const getDetail = (row: any) => {
    };

    const editDetail = (row: any) => {

    };

    useEffect(() => {
        socket.on("contactUs", (data: any) => {
            console.log('*****************',data)
            if(data){
                dispatch(FetchContactUSListing({ page: currentPage, usersPerPage }))
            }
        });
        return () => {
            socket.off("contactUs");
        };
    }, [dispatch]);


    return (
        <div>
            <div className={`card ${className}`}>
                <div className="card-header border-0 py-3">
                    <h3 className="card-title align-items-start flex-column">
                        <span className="card-label fw-bold fs-3 mb-1">Contact Us</span>
                    </h3>
                </div>

                {contactus && contactus?.length > 0 ? (
                    <>
                        <SharedTable
                            headers={headers}
                            data={contactus}
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
        </div>
    );
};

export { ContactUs };
