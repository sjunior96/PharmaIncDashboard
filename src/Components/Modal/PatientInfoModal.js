import React, { useContext } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import { Avatar, DialogContentText, makeStyles, Typography } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { Context } from '../../Context/PatientsContext';
import Link from '@material-ui/core/Link';


export default function PatientInfoModal({ labels }) {
    const { modalOpen, selectedPatient, handleModalClose, getParamsId } = useContext(Context);
    const classes = useStyles();
    return (
        <div>
            <Dialog
                open={modalOpen}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleModalClose}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
                PaperProps={{
                    style: {
                        overflowY: "visible"
                    }
                }}
            >
                <div style={{ height: "50px", width: "100%", display: 'flex', justifyContent: "center", position: 'absolute' }}>
                    <Avatar className={classes.patientImage} src={selectedPatient && selectedPatient.picture && selectedPatient.picture.large} />
                </div>
                <DialogTitle id="alert-dialog-slide-title" onClose={handleModalClose} style={{ height: "30px" }}>
                </DialogTitle>
                <DialogContent>
                    {labels.map((label) => label.valueGetter && selectedPatient ? (
                        <Typography>{label.labelName}: {label.fieldType === "link" ? <Link target="_blank" href={label.valueGetter(selectedPatient)}>{label.valueGetter(selectedPatient)}</Link> : label.valueGetter(selectedPatient)}</Typography>
                    ) : (
                        <Typography>{label.labelName}: {label.fieldType === "link" ? <Link href="#">{selectedPatient && selectedPatient[label.field]}</Link> : selectedPatient && selectedPatient[label.field]}</Typography>
                    )
                    )}
                    {selectedPatient && getParamsId(selectedPatient).includes("*") && <DialogContentText className={classes.noteText}>*Por possuir ID inválido retornado pela RandomUserAPI,
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