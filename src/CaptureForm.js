import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function CaptureForm(props) {

  function  bootCamera(){
    var constraints = { audio: false, video: { width: 1280, height: 720 } }; 
    var promise = navigator.mediaDevices.getUserMedia(constraints)
    .then(function(mediaStream){
      var video = document.querySelector('video');
      video.srcObject = mediaStream;
      video.onloadedmetadata = function(e){
        video.play();
      };
    }).catch(function(err){
      console.log(err.name + ": " + err.message); 
    });
  };
    function handleClose() {
    props.onClick();
  };
  const message_ = "お菓子班お疲れ様です。レシートを撮影してください。 映えは気にしてません。"
  return (
    <div>
      <Dialog open={props.isOpen} onClose={handleClose} aria-labelledby="form-dialog-title" >
        <DialogTitle id="form-dialog-title">Capture</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {message_}
            </DialogContentText>
          <video id="myVideo" width="400" height="300" autoPlay="1" ></video>
        </DialogContent>
        
        <DialogActions>
          <Button onClick={bootCamera} color="primary">Capture</Button>
          <Button onClick={handleClose} color="primary">
            Cancel
            </Button>
          <Button onClick={handleClose} color="primary">
            OK
            </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}