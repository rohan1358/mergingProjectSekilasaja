import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Button from "../Button";

//Import firebase for login function
import fire from "../../fire";

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: theme.spacing(2),

        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '300px',
        },
        '& .MuiButtonBase-root': {
            margin: theme.spacing(2),
        },
    },
}));

//Form for login, including all other methods relevant to login
const LoginForm = ({ handleClose }) => {
    const classes = useStyles();

    // create state variables for each input
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Method to login with firebase
    const login = () => {
        const auth = fire.auth();
        auth.signInWithEmailAndPassword(email, password)
            .then((resp) => {
                console.log("Login successful!");
                handleClose();
            })
            .catch((err) => {
                console.log("Error: " + err.toString());
            })
    };

    const handleSubmit = e => {
        e.preventDefault();
        console.log('Logging in...');

        //Call function to login with firebase
        login();
    };

    return (
        <form className={classes.root} onSubmit={handleSubmit}>
            <TextField
                label="Email"
                variant="filled"
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
            />
            <TextField
                label="Password"
                variant="filled"
                type="password"
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
            />
            <div>
                <Button round type="submit" color="primary">
                    Login
                </Button>
            </div>
        </form>
    );
};

export default LoginForm;