import React, { useState, useEffect } from 'react';
import { useData } from '../../context/DataContext';
import { toast } from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.min.css';
import './TenantManagement.css'; // Import custom CSS for tenant management

function TenantManagement() {
  const { state, dispatch } = useData();
  const [newTenant, setNewTenant] = useState({ name: '', email: '', room: '' });

  useEffect(() => {
    dispatch({ type: 'SET_TENANTS', payload: [] });
  }, [dispatch]);

  const handleAddTenant = () => {
    if (!newTenant.name || !newTenant.email || !newTenant.room) {
      toast.error('Please fill in all tenant details');
      return;
    }

    dispatch({ type: 'ADD_TENANT', payload: newTenant });
    setNewTenant({ name: '', email: '', room: '' });
    toast.success('Tenant added successfully');
  };

  const handleDeleteTenant = (index) => {
    dispatch({ type: 'DELETE_TENANT', payload: index });
    toast.info('Tenant deleted');
  };

  return (
    <div className="container">
      <h2 className="my-4">Tenant Management</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Room</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {state.tenants.map((tenant, index) => (
            <tr key={index}>
              <td>{tenant.name}</td>
              <td>{tenant.email}</td>
              <td>{tenant.room}</td>
              <td>
                <button className="btn btn-danger" onClick={() => handleDeleteTenant(index)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Name"
          value={newTenant.name}
          onChange={(e) => setNewTenant({ ...newTenant, name: e.target.value })}
        />
      </div>
      <div className="mb-3">
        <input
          type="email"
          className="form-control"
          placeholder="Email"
          value={newTenant.email}
          onChange={(e) => setNewTenant({ ...newTenant, email: e.target.value })}
        />
      </div>
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Room"
          value={newTenant.room}
          onChange={(e) => setNewTenant({ ...newTenant, room: e.target.value })}
        />
      </div>
      <button className="btn btn-primary" onClick={handleAddTenant}>Add Tenant</button>
    </div>
  );
}

export default TenantManagement;
