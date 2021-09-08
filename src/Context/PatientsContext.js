import React, { createContext } from 'react';
import usePatients from './hooks/usePatients';

const Context = createContext();

const PatientsProvider = ({ children }) => {
    const {
        patients,
        selectedPatient,
        getPatientsData,
        loadMorePatients,
        isLoading,
        loadingMessage,
        pagination,
        modalOpen,
        handleModalOpen,
        handleModalClose,
        handleSearchNameChange,
        searchName,
        filteredData,
        setFilteredData,
        getViewInfoAction,
        clearFilter,
        getPatientURL,
        searchNationality,
        setSearchNationality,
        getDateOfBirth,
        getAddress,
        getParamsId,
        findByFields
    } = usePatients();

    return (
        <Context.Provider value={{
            patients,
            selectedPatient,
            getPatientsData,
            loadMorePatients,
            isLoading,
            loadingMessage,
            pagination,
            modalOpen,
            handleModalOpen,
            handleModalClose,
            handleSearchNameChange,
            searchName,
            filteredData,
            setFilteredData,
            getViewInfoAction,
            clearFilter,
            getPatientURL,
            searchNationality,
            setSearchNationality,
            getDateOfBirth,
            getAddress,
            getParamsId,
            findByFields
        }}>
            {children}
        </Context.Provider>
    );
};

export { Context, PatientsProvider };