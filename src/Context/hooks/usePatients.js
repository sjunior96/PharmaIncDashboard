import { useEffect, useState } from "react";

import axios from 'axios';
import history from "../../history";

const usePatients = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [patients, setPatients] = useState([]);
    const [selectedPatient, setSelectedPatient] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [pagination, setPagination] = useState({});
    const [loadingMessage, setLoadingMessage] = useState("");
    const [searchName, setSearchName] = useState("");
    const [filteredData, setFilteredData] = useState([]);

    const getPatientsData = (patientInfo) => {
        setIsLoading(true);
        setLoadingMessage("Loading data...");
        let url = patientInfo ? `https://randomuser.me/api/?page=1&results=${50 * patientInfo.page}&seed=${patientInfo.seed}` : "https://randomuser.me/api/?results=50";
        axios.get(url)
            .then((response) => {
                setPatients(response.data.results);
                setPagination(response.data.info);
                setIsLoading(false);
                if (patientInfo) {
                    /* setSelectedPatient(response.data.results.filter((patient) => ((patient.id.value !== null && patient.id.value.replace(" ", "") === patientInfo.patientId) || ((patient.nat + "-" + patient.cell).replace(" ", "") === patientInfo.patientId)))[0]); */
                    setSelectedPatient(response.data.results.filter((patient) => patient && patient.id && patient.id.value && patient.id.value.replace(" ", "") === patientInfo.patientId)[0]);
                    response.data.results.filter((patient, index) => {
                        if (patient && patient.id && patient.id.value && patient.id.value.replace(" ", "") === patientInfo.patientId) {
                            console.log(index + " Encontou");
                            return patient;
                        }
                        else {
                            console.log(`${index} ${patient.id.value} é diferente de ${patientInfo.patientId}`);
                        }
                    });
                    setModalOpen(true);
                }
            });
    };

    const loadMorePatients = () => {
        setIsLoading(true);
        setLoadingMessage("Loading more...");
        var url = `https://randomuser.me/api/?page=${pagination.page + 1}&results=50&seed=${pagination.seed}`;
        axios.get(url)
            .then((response) => {
                setPatients(oldArray => [...oldArray, ...response.data.results]);
                setPagination(response.data.info);
                setIsLoading(false);
            });
    };

    const handleModalOpen = (infoData) => {
        setSelectedPatient(infoData);
        setModalOpen(true);
    };

    const handleModalClose = () => {
        setSelectedPatient({});
        setModalOpen(false);
    };

    const handleSearchNameChange = (name) => {
        setSearchName(name);
    };

    const getViewInfoAction = (infoData) => {
        return (
            <button onClick={() => handleModalOpen(infoData)}>
                Detalhes
            </button>
        );
    };

    const clearFilter = () => {
        setFilteredData([]);
    };

    const getPatientURL = (params) => {
        let baseURL = "http://localhost:3000/patients/";
        if (params && params.id && params.id.value !== null) {
            return `${baseURL}${params.id.value.replace(" ", "")}/${pagination.seed}/${pagination.page}`;
        }
        else {
            return `${baseURL}${params.nat + "-" + (params.cell && params.cell.replace(" ", ""))}/${pagination.seed}/${pagination.page}`;
        }
    };

    useEffect(() => {
        var patientId = window.location.pathname.split("/")[2];
        var seed = window.location.pathname.split("/")[3];
        var page = window.location.pathname.split("/")[4];

        if (patientId && seed && page) {
            getPatientsData({ patientId, seed, page });
        }
        else {
            getPatientsData();
        }
    }, []);

    return {
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
        getPatientURL
    };
};

export default usePatients;