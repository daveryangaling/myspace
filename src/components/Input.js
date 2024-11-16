// Input.js
import React from 'react';

const Input = ({ type, placeholder, value, onChange }) => (
  <input
    type={type}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    required // Adding HTML required attribute as an additional check
  />
);

export default Input;
