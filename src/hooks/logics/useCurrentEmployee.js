import { useState } from 'react';

export const useCurrentEmployee = (initialEmployees, columns = []) => {
    const [search, setSearch] = useState("");

    const handleSearchChange = (event) => {
        setSearch(event.target.value);
    };

    const filteredEmployees = initialEmployees.filter(employee => {
        return columns && columns.some(column => {
            if(column.selector && typeof column.selector === 'function'){
                const stringifiedValue = String(column.selector(employee));
                return stringifiedValue.toLowerCase().includes(search.toLowerCase());
            }
            return false;
        });
    });

    return {
        search,
        handleSearchChange,
        filteredEmployees
    };
};

