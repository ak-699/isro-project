import React, { useState, useEffect } from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';

const LoginPage = () => {
    const [isBlocking, setIsBlocking] = useState(true);
    const [showDialog, setShowDialog] = useState(false);
    const [navigateAway, setNavigateAway] = useState(false);

    useEffect(() => {
        const handleBeforeUnload = (event) => {
            if (isBlocking) {
                // event.preventDefault();
                event.returnValue = ''; // This will not show the browser's default prompt
                setShowDialog(true);
                return true;
            }
        };

        window.addEventListener('beforeunload', handleBeforeUnload);
        console.log("added beforeunload event");
        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
            console.log("removed beforeunload event");
        };
    }, [isBlocking]);

    const handleStay = () => {
        setShowDialog(false);
    };

    const handleLeave = () => {
        setIsBlocking(false);
        setShowDialog(false);
        setNavigateAway(true);
    };

    useEffect(() => {
        if (navigateAway) {
            window.location.reload(); // Reloads the page to simulate navigation away
        }
    }, [navigateAway]);

    return (
        <div>
            <Dialog
                open={showDialog}
                onClose={handleStay}
            >
                <DialogTitle id="alert-dialog-title">Leave Page?</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        You have unsaved changes. Are you sure you want to leave this page?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleStay} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleLeave} color="primary" autoFocus>
                        OK
                    </Button>
                </DialogActions>
            </Dialog>
            <div>
                this is login page
            </div>
        </div>
    );
};

export default LoginPage;




/* 

const handleBeforeUnload = (event) => {
    event.preventDefault();
    event.returnValue = true;
    };


window.addEventListener("beforeunload", handleBeforeUnload);

return () => {
        window.removeEventListener("beforeunload", handleBeforeUnload);
    }

*/