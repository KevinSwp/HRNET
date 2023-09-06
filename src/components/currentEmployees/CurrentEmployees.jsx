import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { deleteEmployee } from '../../reducers/saveUserReducer';
import { useCurrentEmployee } from '../../hooks/logics/useCurrentEmployee';

/**
 * Function list employees
 */
function CurrentEmployeesList() {
    // State to hold the list of employees
    const [employees, setEmployees] = useState([]);

    // Dispatch function from Redux to manage global state actions
    const dispatch = useDispatch();

    // useEffect hook to run side effects
    useEffect(() => {
        // Fetch employees from local storage, if they exist, or initialize with an empty array
        const initialEmployees = JSON.parse(localStorage.getItem('employees')) || [];
        setEmployees(initialEmployees);

        // Event handler to listen for changes to the 'employees' key in local storage
        function handleStorageChange(e) {
            if (e.key === 'employees') {
                // Update employees state if there's a change in local storage
                setEmployees(JSON.parse(e.newValue) || []);
            }
        }

        // Add event listener for changes in local storage
        window.addEventListener('storage', handleStorageChange);

        // Clean-up: remove event listener when the component is unmounted
        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);  // Empty dependency array ensures this useEffect runs only once, similar to componentDidMount

    const handleDelete = (employee) => {
        const updatedEmployees = employees.filter(emp => emp.firstName !== employee.firstName);
        setEmployees(updatedEmployees);
        localStorage.setItem('employees', JSON.stringify(updatedEmployees));
        dispatch(deleteEmployee(employee));
    };

    // Configuration for DataTable columns
    const columns = [
        { name: 'First Name', selector: row => row.firstName },
        { name: 'Last Name', selector: row => row.lastName },
        { name: 'Start Date', selector: row => row.startDate },
        { name: 'Department', selector: row => row.department },
        { name: 'Date of Birth', selector: row => row.dateOfBirth },
        { name: 'Street', selector: row => row.street },
        { name: 'City', selector: row => row.city },
        { name: 'State', selector: row => row.state },
        { name: 'Zip Code', selector: row => row.zipCode },
        {
            name: 'Delete',
            cell: row => <button onClick={() => handleDelete(row)}>Delete</button>
        },
    ];

    const { search, handleSearchChange, filteredEmployees } = useCurrentEmployee(employees, columns);

    return (
        <div className="container">
            <h1>Current Employees</h1>
            <input 
                type="text" 
                placeholder="Search..." 
                value={search} 
                onChange={handleSearchChange}
                style={{ marginBottom: "16px" }}
            />
            <DataTable
                data={filteredEmployees}
                columns={columns}
                pagination
                noDataComponent={<div>No matching records found</div>}
            />
            <Link className="backHome" to="/">Home</Link>
        </div>
    );
}

export default CurrentEmployeesList;
