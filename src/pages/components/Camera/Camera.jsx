import React, { useState, useRef } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";

import Camera, { FACING_MODES, IMAGE_TYPES } from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';



const CameraTruck = (props) => {
    const camera = useRef(null);
    const [image, setImage] = useState(null);

    function handleTakePhoto (dataUri) {
        // Do stuff with the photo...
        console.log('takePhoto');
      }
    
      function handleTakePhotoAnimationDone (dataUri) {
        // Do stuff with the photo...
        console.log('takePhoto');
      }
    
      function handleCameraError (error) {
        console.log('handleCameraError', error);
      }
    
      function handleCameraStart (stream) {
        console.log('handleCameraStart');
      }
    
      function handleCameraStop () {
        console.log('handleCameraStop');
      }

    return (
        <div>
         <Dialog open={props.isOpen6} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">
          Foto Caminhão | Nº Recebimento:{" "}
          {props.seqRec.codRec ? <span>{props.seqRec.codRec}</span> : ""}
        </DialogTitle>


              <div style={{display: 'flex', justifyContent: 'center', alignContent: 'center', height: 800, width: 600}}>
             
             <form>
             <input accept="image/*" id="icon-button-file" type="file" capture="environment"/>
             </form>


      <img src={image} alt='Taken photo'/>
    </div>
         
     
        <DialogActions>
          <Button
            onClick={() => {
                props.handleClose();
            }}
            color="primary"
          >
            Salvar
          </Button>
        </DialogActions>
      </Dialog>
        </div>
    )
}

export default CameraTruck