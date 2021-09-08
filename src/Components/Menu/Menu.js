import React from 'react';
import { IconButton, Toolbar, Typography, AppBar, Link, makeStyles } from '@material-ui/core';
import PharmaIncLogo from '../../assets/images/pharma_inc_logo.png';
import { AccountCircle } from '@material-ui/icons';

const Menu = () => {
    const classes = useStyles();
    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" className={classes.title}>
                    <Link href="http://localhost:3000"><img style={{ height: "46.5px", width: "126.75px" }} src={PharmaIncLogo} /></Link>
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
    );
};

const useStyles = makeStyles((theme) => ({
    title: {
        flexGrow: 1,
        marginLeft: 15
    },
}));

export default Menu;