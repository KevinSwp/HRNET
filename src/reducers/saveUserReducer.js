import { createSlice } from '@reduxjs/toolkit';

/**
 * Creating a slice of the Redux store for managing employee data
 */
const employeeSlice = createSlice({
  // Name for this slice of the store
  name: 'employee',

  // Initial state of the employee slice. If employees data exists in localStorage, 
  // it's retrieved and parsed; otherwise, it starts as an empty array.
  initialState: {
    employees: JSON.parse(localStorage.getItem('employees')) || []
  },

  // Reducers are functions that dictate how the state should change based on a specific action.
  reducers: {
    // Save a new employee to the employees array in the state
    saveEmployee: (state, action) => {
      state.employees.push(action.payload);
    },

    // Delete an employee based on their firstName (for this example)
    deleteEmployee: (state, action) => {
      state.employees = state.employees.filter(emp => emp.firstName !== action.payload.firstName);
    }
  }
});

// Destructuring the actions from the created slice for easier use outside this module
export const { saveEmployee, deleteEmployee } = employeeSlice.actions;

// Exporting the reducer function associated with this slice, which will be used in the Redux store setup
export default employeeSlice.reducer;
