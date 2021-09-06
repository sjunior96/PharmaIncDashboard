import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import { Avatar, DialogContentText, makeStyles, Typography } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { getParamsId } from './utils/utils';


export default function AlertDialogSlide({ open, handleClickOpen, handleClose, data = [], labels }) {
    const classes = useStyles();
    return (
        <div>
            {/*             <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                Slide in alert dialog
            </Button> */}
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
                PaperProps={{
                    style: {
                        overflowY: "visible"
                    }
                }}
            >
                <div style={{ height: "50px", width: "100%", display: 'flex', justifyContent: "center", position: 'absolute' }}>
                    <Avatar className={classes.patientImage} src={data && data.picture && data.picture.large} />
                </div>
                <DialogTitle id="alert-dialog-slide-title" onClose={handleClose} style={{ height: "30px" }}>
                </DialogTitle>
                <DialogContent>
                    {labels.map((label) => label.valueGetter && data ? (
                        <Typography>{label.labelName}: {label.valueGetter(data)}</Typography>
                    ) : (
                        <Typography>{label.labelName}: {data[label.field]}</Typography>
                    )
                    )}
                    {data && getParamsId(data).includes("*") && <DialogContentText className={classes.noteText}>*Por possuir ID inválido retornado pela RandomUserAPI,
                        foi criado um ID composto pela nacionalidade e celular.</DialogContentText>}
                </DialogContent>
            </Dialog>
        </div >
    );
}

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const DialogTitle = ((props) => {
    const { children, onClose, style } = props;
    const classes = useStyles();
    return (
        <MuiDialogTitle disableTypography className={classes.root} style={style}>
            <Typography variant="h6">{children}</Typography>
            {onClose ? (
                <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
});

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
    noteText: {
        marginTop: "15px",
        fontWeight: "bold",
        color: "#000"
    },
    patientImage: {
        width: "100px",
        height: "100px",
        position: "absolute",
        top: "-50px",
        border: "1px solid black"
    }
}));