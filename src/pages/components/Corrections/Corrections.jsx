import React from 'react'
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";



const Corrections = (props) => {
    return (
        <div>
         <Dialog open={props.isOpen5} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">
          Ações Corretivas | Nº Recebimento:{" "}
          {props.seqRec.codRec ? <span>{props.seqRec.codRec}</span> : ""}
        </DialogTitle>
    
            <div style={{width: '100%'}}>
              <DialogContent>
              <textarea id="w3review" name="w3review" rows="8" cols="50">

              </textarea>
              </DialogContent>
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

export default Corrections