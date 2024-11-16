// src/components/Dashboard/TenantManagement.js
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useData } from '../../context/DataContext';
import { toast } from 'react-toastify';

const Container = styled.div`
  padding: 20px;
`;

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
    <Container>
      <h2>Tenant Management</h2>
      <table>
        <tbody>
          {state.tenants.map((tenant, index) => (
            <tr key={index}>
              <td>{tenant.name}</td>
              <td>{tenant.email}</td>
              <td>{tenant.room}</td>
              <td>
                <button onClick={() => handleDeleteTenant(index)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <input
        type="text"
        placeholder="Name"
        value={newTenant.name}
        onChange={(e) => setNewTenant({ ...newTenant, name: e.target.value })}
      />
      <input
        type="email"
        placeholder="Email"
        value={newTenant.email}
        onChange={(e) => setNewTenant({ ...newTenant, email: e.target.value })}
      />
      <input
        type="text"
        placeholder="Room" 
        value={newTenant.room}
        onChange={(e) => setNewTenant({ ...newTenant, room: e.target.value })}
      />
      <button onClick={handleAddTenant}>Add Tenant</button>
    </Container>
  );
}

export default TenantManagement;
