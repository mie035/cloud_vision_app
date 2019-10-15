import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import ProposalTable from 'ProposalForm';

function ProposalForm(props) {
    function handleClose() {
        props.onClick();
      };
    return (
        <div>
            <Dialog open={props.isOpen}>
                <DialogTitle id="form-dialog-title">ProposePrice</DialogTitle>
                <DialogContent>
                    <ProposalTable prop={this.props} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={bootCamera} color="primary">Capture</Button>
                    <Button onClick={handleClose} color="primary">
                        OK
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}