import React from 'react';
import { useSelector } from 'react-redux';
import DataTable from 'react-data-table-component';
import useCurrentEmployee from '../../hooks/logics/useCurrentEmployee';
import NavBar from '../layout/NavigationBar';

import './listEmployee.scss';

/**
 * Function list employees
 */
function CurrentEmployeesList() {
    // Use useSelector to access employees from the Redux store
    const employees = useSelector(state => state.employee.employees);

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
