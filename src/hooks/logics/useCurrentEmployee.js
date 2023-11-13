import { useState } from 'react';

/**
 * Function logic list employee
 */
function useCurrentEmployee(initialEmployees = [], columns = []) {
    // State for storing the current value of the search term entered by the user
    const [searchTerm, setSearchTerm] = useState("");

    // Function to update the searchTerm state whenever the user changes the search input
    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    // Creating a new array
    const filteredEmployees = initialEmployees.filter(employee => {
        // For each employee, check if any of the specified columns contains the search term.
        return columns.some(column => {
            // Check if the current column has a selector and that the selector is a function
            if (column.selector && typeof column.selector === 'function') {
                // Invoke the column's selector function to retrieve the value of interest from the employee object
                const stringifiedValue = String(column.selector(employee));
                // Convert both the retrieved value and search term to lowercase and check if the value contains the search term
                return stringifiedValue.toLowerCase().includes(searchTerm.toLowerCase());
            }
            // If the current column doesn't have a valid selector function
            return false;
        });
    });


    // Custom hook returns
    return [searchTerm, handleSearchChange, filteredEmployees];
}

export default useCurrentEmployee;
