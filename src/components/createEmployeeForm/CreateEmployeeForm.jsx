import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { saveEmployee } from '../../reducers/saveUserReducer';
import { Link } from 'react-router-dom';
import states from '../../data/states.json';
import { Modal } from 'plugin_success';
import useCreateEmployeeForm from '../../hooks/logics/useCreateEmployeeForm';

import './form.scss';

/**
 * Function form to create an employee
 */
function CreateEmployeesForm() {
  // Using the useDispatch hook from Redux to dispatch actions
  const dispatch = useDispatch();

  // Custom hook for managing form data, handling changes, and saving employee data
  const [formData, handleChange, saveEmployeeData] = useCreateEmployeeForm();

  // State to control the visibility of the success modal
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Function to handle the save operation when the Save button is clicked
  const handleSave = (e) => {
    e.preventDefault();  // Prevents the default form submit behavior

    // Checks if all fields in the form are filled
    /*const allFieldsFilled = Object.values(formData).every(value => value.trim() !== '');
    if (!allFieldsFilled) {
      alert("Tous les champs doivent être remplis."); // Alert if any field is empty
      return;
    }*/

    // Dispatches an action to save employee data to the Redux store
    dispatch(saveEmployee(formData));

    // Calls a function from the custom hook to save employee data (possibly to a server or local state)
    saveEmployeeData();

    // Retrieves the current list of employees from localStorage, adds the new employee, and saves it back
    const currentEmployees = JSON.parse(localStorage.getItem('employees')) || [];
    currentEmployees.push(formData);
    localStorage.setItem('employees', JSON.stringify(currentEmployees));

    // Sets the modal visibility to true, which will show the success modal
    setIsModalVisible(true);
  };

  // Function to close the modal, sets the modal visibility to false
  const handleCloseModal = () => {
    setIsModalVisible(false);
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
          <input type="number" id="zipCode" name="zipCode" value={formData.zipCode} onChange={handleChange} />
        </fieldset>

        <label htmlFor="department">Department</label>
        <select name="department" id="department" value={formData.department} onChange={handleChange}>
          <option>Sales</option>
          <option>Marketing</option>
          <option>Engineering</option>
          <option>Human Resources</option>
          <option>Legal</option>
        </select>

        <button onClick={handleSave} className='btnSave'>Save</button>
      </form>

      {isModalVisible && <Modal isOpen={true} onClose={handleCloseModal} />}
      {/* {isModalVisible && <Modal isOpen={true} />} */}
    </div>
  );
}

export default CreateEmployeesForm;
