import React, { useContext } from 'react';
import { Container, Box, Grid, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { DataGrid } from '@material-ui/data-grid';
import PatientInfoModal from '../../Components/Modal/PatientInfoModal';

import SearchArea from '../../Components/SearchArea/SearchArea';
import { Context } from '../../Context/PatientsContext';
import Loader from '../../Components/Loader/Loader';
import Menu from '../../Components/Menu/Menu';

export default function Patients() {
    const classes = useStyles();

    const {
        patients,
        isLoading,
        loadMorePatients,
        loadingMessage,
        searchName,
        handleSearchNameChange,
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
    } = useContext(Context);

    const columns = [
        {
            field: "nome",
            headerName: "Name",
            width: 350,
            cellClassName: "cell-without-border",
            headerClassName: "cell-without-border",
            valueGetter: (params) => `${params.getValue(params.id, "name").first} ${params.getValue(params.id, "name").last}`
        },
        {
            field: "gender",
            headerName: "Gender",
            width: 150,
            cellClassName: "cell-without-border",
            headerClassName: "cell-without-border",
        },
        {
            field: "birth",
            headerName: "Birth",
            width: 150,
            cellClassName: "cell-without-border",
            headerClassName: "cell-without-border",
            valueGetter: (params) => `${getDateOfBirth(params.getValue(params.id, "dob").date).reverse().join("/")}`
        },
        {
            field: "actions",
            headerName: "Actions",
            width: 200,
            cellClassName: "cell-without-border",
            headerClassName: "cell-without-border",
            renderCell: (params) => getViewInfoAction(params.row)
        }
    ];

    const modalInfoFields = [
        {
            field: "nome",
            labelName: "Full name",
            fieldType: "text",
            valueGetter: (params) => `${params && params.name && params.name.first} ${params && params.name && params.name.last}`
        },
        {
            field: "email",
            labelName: "Email",
            fieldType: "text",
        },
        {
            field: "gender",
            labelName: "Gender",
            fieldType: "text",
        },
        {
            field: "birthDate",
            labelName: "Birth Date",
            fieldType: "text",
            valueGetter: (params) => `${params && params.dob && getDateOfBirth(params.dob.date).reverse().join("/")}`
        },
        {
            field: "phone",
            labelName: "Phone",
            fieldType: "text",
        },
        {
            field: "nat",
            labelName: "Nationality",
            fieldType: "text",
        },
        {
            field: "address",
            labelName: "Address",
            fieldType: "text",
            valueGetter: (params) => `${params && getAddress(params.location)}`
        },
        {
            field: "identification",
            labelName: "ID",
            fieldType: "text",
            valueGetter: (params) => `${getParamsId(params)}`
        },
        {
            field: "patientUrl",
            labelName: "Patient share URL",
            fieldType: "link",
            valueGetter: (params) => `${getPatientURL(params)}`
        },
    ];

    const nationatilities = [
        "AU",
        "BR",
        "CA",
        "CH",
        "DE",
        "DK",
        "ES",
        "FI",
        "FR",
        "GB",
        "IE",
        "IR",
        "NO",
        "NL",
        "NZ",
        "TR",
        "US"
    ];

    return (
        <Box className={classes.boxRootContainer}>
            <Menu />

            <Container className={classes.container}>
                <div className={classes.root}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} style={{ display: "flex", flexDirection: "row" }}>
                            <SearchArea
                                value={searchName}
                                onChange={(e) => handleSearchNameChange(e.target.value)}
                                label="Search patient..."
                                searchAction={() => setFilteredData(findByFields(patients, searchName, searchNationality))}
                                clearAction={() => clearFilter()}
                                selectFilter={{
                                    onChange: (event) => setSearchNationality(event.target.value),
                                    value: searchNationality,
                                    label: "Nationality",
                                    options: nationatilities
                                }}
                            />
                        </Grid>

                        {!isLoading && (
                            <Grid item xs={12} style={{ height: "500px" }}>
                                <DataGrid
                                    className={classes.patientsTable}
                                    rows={(filteredData && filteredData.length > 0) ? filteredData : patients}
                                    columns={columns}
                                    pageSize={50}
                                    rowsPerPageOptions={[]}
                                    disableSelectionOnClick
                                    getRowId={(params) => `${params && getParamsId(params)}`}
                                />

                                <Button className={classes.loadMoreButton} onClick={() => loadMorePatients()}>Load More</Button>
                            </Grid>
                        )}
                    </Grid>
                </div>

                <Loader
                    isLoading={isLoading}
                    loadingMessage={loadingMessage}
                />
            </Container>

            <div>
                <PatientInfoModal
                    labels={modalInfoFields}
                />
            </div>
        </Box >
    );
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    loadMoreButton: {
        backgroundColor: "green",
        color: "#FFF",
        marginTop: "15px",
        '&:hover': {
            backgroundColor: "#FFF",
            color: "green"
        },
    },
    boxRootContainer: {
        width: "100vw",
        height: "100vh",
        backgroundColor: "#FFF",
        padding: 0,
        margin: 0
    },
    patientsTable: {
        "& .cell-without-border:focus": {
            outline: "none"
        },
        "& .cell-without-border:focus-within": {
            outline: "none"
        }
    },
    container: {
        marginTop: "30px"
    }
}));