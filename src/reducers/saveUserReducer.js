import { createSlice } from '@reduxjs/toolkit';

/**
 * Creating a slice of the Redux store for managing employee data
 */
const employeeSlice = createSlice({
  // Name for this slice of the store
  name: 'employee',

  initialState: {
    employees: [] // Starts with an empty array or predefined data
  },

  // Reducers are functions that dictate how the state should change based on a specific action.
  reducers: {
    // Save a new employee to the employees array in the state
    saveEmployee: (state, action) => {
      state.employees.push(action.payload);
    },
  }
});

// Destructuring the actions from the created slice for easier use outside this module
export const { saveEmployee } = employeeSlice.actions;

// Exporting the reducer function associated with this slice, which will be used in the Redux store setup
export default employeeSlice.reducer;
