// src/context/DataContext.js
import React, { createContext, useReducer, useContext } from 'react';

const initialState = {
  tenants: [],
  rooms: [],
  maintenanceRequests: []
};

function dataReducer(state, action) {
  switch (action.type) {
    case 'SET_TENANTS':
      return { ...state, tenants: action.payload };
    case 'ADD_TENANT':
      return { ...state, tenants: [...state.tenants, action.payload] };
    case 'DELETE_TENANT':
      return {
        ...state,
        tenants: state.tenants.filter((_, index) => index !== action.payload)
      };
    case 'SET_ROOMS':
      return { ...state, rooms: action.payload };
    case 'SET_MAINTENANCE_REQUESTS':
      return { ...state, maintenanceRequests: action.payload };
    default:
      return state;
  }
}

const DataContext = createContext();

export function DataProvider({ children }) {
  const [state, dispatch] = useReducer(dataReducer, initialState);

  return (
    <DataContext.Provider value={{ state, dispatch }}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  return useContext(DataContext);
}
