import React, { useContext } from 'react';
import { Container, IconButton, Toolbar, Typography, AppBar, Box, TextField, Grid, InputAdornment, Dialog, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import { AccountCircle, SearchOutlined } from '@material-ui/icons';
import { DataGrid } from '@material-ui/data-grid';
import PatientInfoModal from '../../Components/Modal/PatientInfoModal';
import { findByName, getAddress, getDateOfBirth, getParamsId } from '../../utils/utils';
import { CircularProgress } from '@material-ui/core';

import { Context } from '../../Context/PatientsContext';

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
        getPatientURL
    } = useContext(Context);

    const columns = [
        {
            field: "nome",
            headerName: "Name",
            width: 350,
            valueGetter: (params) => `${params.getValue(params.id, "name").first} ${params.getValue(params.id, "name").last}`
        },
        {
            field: "gender",
            headerName: "Gender",
            width: 150,
        },
        {
            field: "birth",
            headerName: "Birth",
            width: 150,
            valueGetter: (params) => `${getDateOfBirth(params.getValue(params.id, "dob").date).reverse().join("/")}`
        },
        {
            field: "actions",
            headerName: "Actions",
            width: 200,
            renderCell: (params) => getViewInfoAction(params.row)
        }
    ];

    const modalInfoFields = [
        {
            field: "nome",
            labelName: "Full name",
            valueGetter: (params) => `${params && params.name && params.name.first} ${params && params.name && params.name.last}`
        },
        { field: "email", labelName: "Email" },
        { field: "gender", labelName: "Gender" },
        {
            field: "birthDate",
            labelName: "Birth Date",
            valueGetter: (params) => `${params && params.dob && getDateOfBirth(params.dob.date).reverse().join("/")}`
        },
        { field: "phone", labelName: "Phone" },
        {
            field: "nat",
            labelName: "Nationality",
        },
        {
            field: "address",
            labelName: "Address",
            valueGetter: (params) => `${params && getAddress(params.location)}`
        },
        {
            field: "identification",
            labelName: "ID",
            valueGetter: (params) => `${getParamsId(params)}`
        },
        {
            field: "patientUrl",
            labelName: "Patient share URL",
            valueGetter: (params) => `${getPatientURL(params)}`
        },
    ];

    return (
        <Box
            style={{
                width: "100vw",
                height: "100vh",
                backgroundColor: "#FFF",
                padding: 0,
                margin: 0
            }}
        >
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        PH Inc.
                    </Typography>
                    <div>
                        <IconButton
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            color="inherit"
                        >
                            <AccountCircle />
                        </IconButton>
                    </div>
                </Toolbar>
            </AppBar>
            <Container
                style={{
                    marginTop: "30px"
                }}>
                <div className={classes.root}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <TextField
                                value={searchName}
                                onChange={(e) => handleSearchNameChange(e.target.value)}
                                fullWidth
                                id="outlined-basic"
                                label="Search patient..."
                                variant="outlined"
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="start">
                                            <IconButton aria-label="close" className={classes.closeButton} onClick={() => setFilteredData(findByName(patients, searchName))}>
                                                <SearchOutlined />
                                            </IconButton>
                                        </InputAdornment>
                                    )
                                }}
                            />
                            <Button onClick={() => clearFilter()}>Limpar filtro</Button>
                        </Grid>

                        {!isLoading && (
                            <Grid item xs={12} style={{ height: "500px" }}>
                                <DataGrid
                                    rows={(filteredData && filteredData.length > 0) ? filteredData : patients}
                                    columns={columns}
                                    pageSize={50}
                                    rowsPerPageOptions={[]}
                                    disableSelectionOnClick
                                    getRowId={(params) => `${params && getParamsId(params)}`}
                                />
                                <Button onClick={() => loadMorePatients()}>Load More</Button>
                            </Grid>
                        )}
                    </Grid>
                </div>

                <div>
                    <Dialog
                        open={isLoading}
                        PaperProps={{
                            style: {
                                overflowY: "visible",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                backgroundColor: "transparent",
                                boxShadow: "none"
                            }
                        }}
                    >
                        <CircularProgress />
                        <Typography style={{ color: "white" }}>{loadingMessage}</Typography>
                    </Dialog>
                </div>
            </Container>

            <div>
                <PatientInfoModal
                    labels={modalInfoFields}
                />
            </div>
        </Box>
    );
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
    searchArea: {
        marginBottom: "20px"
    }
}));