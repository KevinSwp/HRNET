import { useState } from 'react';

/**
 * Custom hook for creating an employee form
 */
function useCreateEmployeeForm() {
  // Initial state for the form data
  const initialState = {
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    startDate: '',
    street: '',
    city: '',
    state: 'AL',
    zipCode: '',
    department: 'Sales',
  };

  // State to hold form data with its setter function
  const [formData, setFormData] = useState(initialState);

  /**
   * handleChange updates the form data state when an input field changes.
   * @param {Object} e - The event object from the input field.
   */
  const handleChange = (e) => {
    // Destructuring the name and value properties from the event target (input element)
    const { name, value } = e.target;
    // Update the specific property of formData state with the new value
    setFormData({
      ...formData,   // Spread out current formData
      [name]: value, // Update the specific field with new value
    });
  };

  /**
   * Function to save the employee data and reset the form
   */
  const saveEmployeeData = () => {
    // Logging the current form data to console for demonstration purposes
    console.log('Employee Data:', formData);
    // Resetting the form data to initial state
    setFormData(initialState);
  };

  // Return values from the custom hook (current form data, change handler, and save function)
  return [formData, handleChange, saveEmployeeData];
}

// Exporting the custom hook for usage in other components
export default useCreateEmployeeForm;
