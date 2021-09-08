import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import DirectionsIcon from '@material-ui/icons/Directions';
import ClearIcon from '@material-ui/icons/Clear';

import Select from '../Select/Select';

const useStyles = makeStyles((theme) => ({
    root: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        flex: "1 1 auto"
    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1,
    },
    iconButton: {
        padding: 10,
    },
    divider: {
        height: 28,
        margin: 4,
    },
}));

const InputText = ({ value, label, onChange, searchAction, clearAction, selectFilter }) => {
    const classes = useStyles();

    return (
        <Paper component="form" className={classes.root}>
            <InputBase
                value={value}
                fullWidth
                className={classes.input}
                placeholder={label}
                inputProps={{ 'aria-label': 'search google maps' }}
                onChange={onChange}
            />
            {selectFilter && (
                <Select
                    label={selectFilter.label}
                    value={selectFilter.value}
                    onChange={selectFilter.onChange}
                    options={selectFilter.options}
                />
            )}
            <IconButton className={classes.iconButton} aria-label="search" onClick={searchAction}>
                <SearchIcon />
            </IconButton>
            <Divider className={classes.divider} orientation="vertical" />
            <IconButton className={classes.iconButton} aria-label="directions" onClick={clearAction}>
                <ClearIcon />
            </IconButton>
        </Paper>
    );
};

export default InputText;
