import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { useDispatch } from 'react-redux';
import { deleteEmployee } from '../../reducers/saveUserReducer';
import useCurrentEmployee from '../../hooks/logics/useCurrentEmployee';
import NavBar from '../layout/NavigationBar';

import './listEmployee.scss';

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

        /**
         * handleStorageChange listens for changes in local storage.
         * @param {Object} e - The storage event object.
         */
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

    /**
     * handleDelete removes an employee from the list.
     * @param {Object} employee - The employee to be deleted.
     */
    const handleDelete = (employee) => {
        const updatedEmployees = employees.filter(emp => emp.firstName !== employee.firstName);
        setEmployees(updatedEmployees);
        localStorage.setItem('employees', JSON.stringify(updatedEmployees));
        dispatch(deleteEmployee(employee));
    };

    // Configuration for DataTable columns
    const columns = [
        { name: 'Prenom', selector: row => row.firstName, sortable: true },
        { name: 'Nom', selector: row => row.lastName, sortable: true },
        { name: 'Debut', selector: row => row.startDate, sortable: true },
        { name: 'Departement', selector: row => row.department, sortable: true },
        { name: 'Date de naissance', selector: row => row.dateOfBirth, sortable: true },
        { name: 'Rue', selector: row => row.street, sortable: true },
        { name: 'Ville', selector: row => row.city, sortable: true },
        { name: 'Etat', selector: row => row.state, sortable: true },
        { name: 'Code postal', selector: row => row.zipCode, sortable: true },
        {
            name: 'Delete',
            cell: row => <button onClick={() => handleDelete(row)}>Delete</button>
        },
    ];

    const [searchTerm, handleSearchChange, filteredEmployees] = useCurrentEmployee(employees, columns);

    return (
        <div className='body'>
            <NavBar />
            <div className="containerBis">
                <h1>Employés</h1>
                <input 
                    type="text" 
                    placeholder="Search..." 
                    value={searchTerm} 
                    onChange={handleSearchChange}
                    style={{ marginBottom: "16px" }}
                    />
                <DataTable
                    data={filteredEmployees}
                    columns={columns}
                    pagination
                    noDataComponent={<div>Pas d'employés</div>}
                    />
            </div>
        </div>
    );
}

export default CurrentEmployeesList;
