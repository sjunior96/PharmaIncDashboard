import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';

const useStyles = makeStyles((theme) => ({
    root: {
        marginLeft: "15px",
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '15ch',
        },
    },
}));

export default function Select({ value, options, onChange, label }) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <TextField
                id="outlined-select-currency"
                select
                label={label}
                value={value}
                onChange={onChange}
                variant="outlined"
                size="small"
            >
                <MenuItem key={"NA"} value={""}>
                    Select
                </MenuItem>
                {options.map((option, index) => (
                    <MenuItem key={index} value={option}>
                        {option}
                    </MenuItem>
                ))}
            </TextField>
        </div>
    );
}
