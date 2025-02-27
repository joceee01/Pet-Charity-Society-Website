import React, { useState, useEffect } from "react";
import { Tooltip, OverlayTrigger } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const AllRequests = () => {
    const navigate = useNavigate();
    const username = JSON.parse(localStorage.getItem("username"));
    const [requests, setRequests] = useState([]);
    const [filterType, setFilterType] = useState("all");

    useEffect(() => {
        // Retrieve data from localStorage
        const storedRequests = localStorage.getItem("requests");

        if (storedRequests) {
            setRequests(JSON.parse(storedRequests));
        }
    }, []);

    const filteredRequests = requests.filter((request) => {
        if (filterType === "all") return true;
        return request.requestType === filterType;
    });

    const getStatusColor = (status) => {
        switch (status.toLowerCase()) {
            case "pending":
                return "orange";
            case "approved":
                return "green";
            case "denied":
                return "red";
            default:
                return "black";
        }
    };

    return (
        <div className="all-request">
            <h4>All Request</h4>
            <p>View Adoption or Release pet requests.</p>

            <div className="filter-container"><label className="label-style">Filter Request Type:</label>
                <div className="input-icon">
                    <select onChange={(e) => setFilterType(e.target.value)} value={filterType}>
                        <option value="all">All Requests</option>
                        <option value="Adoption">Adoption Requests</option>
                        <option value="Release">Release Requests</option>
                    </select>
                </div>
            </div>
            <div style={{overflowX: "auto"}}>
            {filteredRequests.length > 0 ? (
                <table className="request-table">
                    <thead>
                        <tr>
                            <th>Ticket ID</th>
                            <th>Requester</th>
                            <th>Request Type</th>
                            <th>Created Date & Time</th>
                            <th>Pet Name</th>
                            <th>Pet Age</th>
                            <th>Breed</th>
                            <th>Cost Payable</th>
                            <th>Request Status</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredRequests.map((request, index) => (
                            <tr key={index}>
                                <td>{request.ticketId}</td>
                                <td>{request.fullName}</td>
                                <td>{request.requestType}</td>
                                <td>{request.createdDateTime}</td>
                                <td>{request.petName}</td>
                                <td>{request.petAge}</td>
                                <td>{request.petBreed}</td>
                                <td style={{ fontWeight: "bold" }}>${request.costPayable}.00</td>
                                <td style={{ color: getStatusColor(request.requestStatus) }}>
                                    <b>{request.requestStatus}</b>
                                </td>
                                <td style={{ cursor: "pointer", textAlign: "center" }}><b>
                                    <OverlayTrigger
                                        placement="left"
                                        delay={{ show: 200, hide: 200 }}
                                        overlay={<Tooltip>Click to update request status.</Tooltip>}
                                    >
                                        <a
                                            className="update-link"
                                            onClick={() => navigate(`/update-requests?username=${username}&ticketId=${request.ticketId}`)}>
                                            Update
                                        </a>
                                    </OverlayTrigger>
                                </b>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No requests found.</p>
            )}
            </div>
            
        </div>
    );
};
export default AllRequests;