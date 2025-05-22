import { useEffect, useState } from "react";
import API from "../api/axios";

const PendingRequests = () => {
  const [requests, setRequests] = useState([]);

  const fetchRequests = async () => {
    try {
      const token = localStorage.getItem("token");
      // console.log(localStorage);
      
      const res = await API.get("/pending-requests", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setRequests(res.data);
    } catch (err) {
      alert("Failed to fetch requests");
      console.log(err);
    }
  };

  const handleDecision = async (id, status) => {
    try {
      const token = localStorage.getItem("token");
      await API.patch(`/requests/${id}`, 
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      alert(`Request ${status}`);
      fetchRequests(); 
    } catch (err) {
      alert("Failed to update request");
      console.log(err);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  return (
    <div className="container py-5">
  <h2 className="text-center mb-4">Pending Access Requests</h2>

  {requests.length === 0 ? (
    <p className="text-center text-muted">No pending requests</p>
  ) : (
    <ul className="list-group">
      {requests.map((req) => (
        <li key={req.id} className="list-group-item mb-3">
          <p><strong>User:</strong> {req.user ? req.user.username : "N/A"}</p>
          <p><strong>Software:</strong> {req.software ? req.software.name : "N/A"}</p>
          <p><strong>Access Type:</strong> {req.accessType}</p>
          <p><strong>Reason:</strong> {req.reason}</p>

          <div className="d-flex gap-2">
            <button
              className="btn btn-success"
              onClick={() => handleDecision(req.id, "Approved")}
            >
              Approve
            </button>
            <button
              className="btn btn-danger"
              onClick={() => handleDecision(req.id, "Rejected")}
            >
              Reject
            </button>
          </div>
        </li>
      ))}
    </ul>
  )}
</div>

  );
};

export default PendingRequests;
