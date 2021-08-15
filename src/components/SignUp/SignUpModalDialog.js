import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import SignUpForm from './SignUpForm';

const SignUpModalDialog = ({ open, handleClose }) => {
    return (
        <Dialog open={open} onClose={handleClose}>
            <SignUpForm handleClose={handleClose} />
        </Dialog>
    );
};

export default SignUpModalDialog;