import React from 'react';
import useCreateEmployeeForm from '../../hooks/logics/useCreateEmployeeForm';
import { useDispatch } from 'react-redux';
import { saveEmployee } from '../../reducers/saveUserReducer';
import { Link } from 'react-router-dom';
import states from '../../data/states.json'

import './form.scss';

/**
 * Function create employee
 */

function CreateEmployeesForm() {
  // Use the useDispatch hook to get a reference to the dispatch function from Redux.
  const dispatch = useDispatch();

  const [formData, handleChange, saveEmployeeData] = useCreateEmployeeForm();

  const handleSave = (e) => {
    e.preventDefault();

    // Dispatches the saveEmployee action to the Redux store with formData as payload.
    dispatch(saveEmployee(formData));

    // Calls the saveEmployeeData function from useCreateEmployeeForm.
    saveEmployeeData();

    // Fetches the current list of employees from localStorage (or sets an empty array if none found).
    // Then, the new formData (new employee) is added to the list and saved back to localStorage.
    const currentEmployees = JSON.parse(localStorage.getItem('employees')) || [];
    currentEmployees.push(formData);
    localStorage.setItem('employees', JSON.stringify(currentEmployees));
  };

  return (
    <div className="container">
      <h1>HRnet</h1>
      <Link className="list" to="/current-employees">View Current Employees</Link>
      <h2>Create Employee</h2>
      <form id="create-employee">
        <label htmlFor="firstName">First Name</label>
        <input type="text" id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} />

        <label htmlFor="lastName">Last Name</label>
        <input type="text" id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} />

        <label htmlFor="dateOfBirth">Date of Birth</label>
        <input type="date" id="dateOfBirth" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} />

        <label htmlFor="startDate">Start Date</label>
        <input type="date" id="startDate" name="startDate" value={formData.startDate} onChange={handleChange} />

        <fieldset className="address">
          <legend>Address</legend>

          <label htmlFor="street">Street</label>
          <input type="text" id="street" name="street" value={formData.street} onChange={handleChange} />

          <label htmlFor="city">City</label>
          <input type="text" id="city" name="city" value={formData.city} onChange={handleChange} />

          <label htmlFor="state">State</label>
          <select name="state" id="state" value={formData.state} onChange={handleChange}>
            {states.map((state, index) => (
              <option key={index} value={state.abbreviation}>
                {state.name}
              </option>
            ))}
          </select>

          <label htmlFor="zipCode">Zip Code</label>
          <input type="number" id="zipCode" name="zipCode" pattern="^(?(^00000(|-0000))|(\d{5}(|-\d{4})))$" value={formData.zipCode} onChange={handleChange} />
        </fieldset>

        <label htmlFor="department">Department</label>
        <select name="department" id="department" value={formData.department} onChange={handleChange}>
          <option>Sales</option>
          <option>Marketing</option>
          <option>Engineering</option>
          <option>Human Resources</option>
          <option>Legal</option>
        </select>
      </form>

      <button onClick={handleSave}>Save</button>
    </div>
  );
}

export default CreateEmployeesForm;
