import { CircularProgress } from '@material-ui/core';
import React from 'react';

export default function Loader() {
    return (
        <div style={{ height: "100vh", width: "100vw", backgroundColor: "red", position: "absolute", display: "flex", alignItems: "center", justifyContent: "center", top: "0", left: "0", zIndex: 10 }}>
            <CircularProgress />
        </div>
    );
}