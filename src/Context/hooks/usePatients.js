import { useEffect, useState } from "react";

import axios from 'axios';
import { Button } from "@material-ui/core";

const usePatients = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [patients, setPatients] = useState([]);
    const [selectedPatient, setSelectedPatient] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [pagination, setPagination] = useState({});
    const [loadingMessage, setLoadingMessage] = useState("");
    const [searchName, setSearchName] = useState("");
    const [searchNationality, setSearchNationality] = useState("");
    const [filteredData, setFilteredData] = useState([]);

    const transformData = (data) => {
        return data.results.map((res) => {
            return {
                ...res,
                pagination: data.info.page
            };
        });
    };

    const getPatientsData = (patientInfo) => {
        setIsLoading(true);
        setLoadingMessage("Loading data...");

        let urlsToRequest = [];
        if (patientInfo) {
            for (let i = 1; i <= patientInfo.page; i++) {
                urlsToRequest.push(axios.get(`https://randomuser.me/api/?page=${i}&results=50&seed=${patientInfo.seed}`));
            }
        }
        else {
            urlsToRequest.push(axios.get("https://randomuser.me/api/?results=50"));
        }

        Promise
            .all(urlsToRequest)
            .then((responses) => {
                setIsLoading(false);
                responses.map((response) => {
                    setPatients(oldArray => [...oldArray, ...transformData(response.data)]);
                    setPagination(response.data.info);
                    if (patientInfo) {
                        let patient = response.data.results.filter((patient) => patient && patient.login && patient.login.uuid === patientInfo.patientId)[0];
                        if (patient) {
                            setSelectedPatient({ ...patient, pagination: patientInfo.page });
                            setModalOpen(true);
                        }
                    }
                });
            })
            .catch((error) => console.log("ERRO"));
    };

    const loadMorePatients = () => {
        setIsLoading(true);
        setLoadingMessage("Loading more...");
        var url = `https://randomuser.me/api/?page=${pagination.page + 1}&results=50&seed=${pagination.seed}`;
        axios.get(url)
            .then((response) => {
                setPatients(oldArray => [...oldArray, ...transformData(response.data)]);
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
            <Button
                onClick={() => handleModalOpen(infoData)}
                color="primary"
                variant="contained"
            >
                Visualizar
            </Button>
        );
    };

    const getDateOfBirth = (date) => {
        var arrayDOB = date.split("-");
        arrayDOB.splice(2, 1, arrayDOB[2].split("T")[0]);
        return arrayDOB;
    };

    const getAddress = (location) => {
        var address = `${location && location.street && location.street.name ? location.street.name : ""}, `;
        address += `${location && location.street && location.street.number ? location.street.number : ""}, `;
        address += `${location && location.city ? location.city : ""}, `;
        address += `${location && location.state ? location.state : ""}, `;
        address += `${location && location.country ? location.country : ""}`;
        return address;
    };

    const getParamsId = (params) => {
        return params && params.login ? params.login.uuid : "";
    };

    const findByFields = (data, name, nationality) => {
        return data.filter((patient) => {
            var fullName = `${patient.name.first} ${patient.name.last}`.toLowerCase();
            return (fullName.includes(name.toLowerCase()) && (patient && patient.nat.toLowerCase().includes(nationality.toLowerCase()))) && patient;
        });
    };

    const clearFilter = () => {
        setFilteredData([]);
        setSearchName("");
        setSearchNationality("");
    };

    const getPatientURL = (params) => {
        let baseURL = "http://localhost:3000/patients/";
        return `${baseURL}${params && params.login && params.login.uuid}/${pagination.seed}/${params.pagination}`;
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
        getPatientURL,
        searchNationality,
        setSearchNationality,
        getDateOfBirth,
        getAddress,
        getParamsId,
        findByFields
    };
};

export default usePatients;