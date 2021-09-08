import React from 'react';
import { makeStyles } from '@material-ui/core';
import { Typography, Dialog, } from '@material-ui/core';
import { CircularProgress } from '@material-ui/core';

const Loader = ({ isLoading, loadingMessage }) => {
    const classes = useStyles();
    return (
        <div>
            <Dialog
                open={isLoading}
                PaperProps={{
                    style: styleProps.paperProps
                }}
            >
                <CircularProgress />
                <Typography className={classes.loadingMessage}>{loadingMessage}</Typography>
            </Dialog>
        </div>
    );
};

const styleProps = {
    paperProps: {
        overflowY: "visible",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "transparent",
        boxShadow: "none"
    }
};

const useStyles = makeStyles((theme) => ({
    loadingMessage: {
        color: "#FFF"
    },
}));

export default Loader;