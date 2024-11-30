import React, { useEffect, useState } from "react";
import "../styles/TenantSide.css";
import TenantSidebar from "../components/TenantSidebar";

function TenantInformation() {
  const [tenantData, setTenantData] = useState({});

  useEffect(() => {
    fetch("/tenantData.json")
      .then((response) => response.json())
      .then((data) => setTenantData(data));
  }, []);

  return (
    <div className="dashboard-container">
      <TenantSidebar />
      <main className="main-content">
        <div className="tenant-info">
          <div className="info-card">
            <h2>Tenant Information</h2>
            <form className="tenant-form">
              <div className="form-group">
                <label htmlFor="tenantName">Tenant Name:</label>
                <input
                  type="text"
                  id="tenantName"
                  value={tenantData.tenantName || ""}
                  readOnly
                />
              </div>
              <div className="form-group">
                <label htmlFor="address">Address:</label>
                <input
                  type="text"
                  id="address"
                  value={tenantData.address || ""}
                  readOnly
                />
              </div>
              <div className="form-group">
                <label htmlFor="contactNumber">Contact Number:</label>
                <input
                  type="text"
                  id="contactNumber"
                  value={tenantData.contactNumber || ""}
                  readOnly
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  id="email"
                  value={tenantData.email || ""}
                  readOnly
                />
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}

export default TenantInformation;
