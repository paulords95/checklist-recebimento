import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";

import CardContent from "@material-ui/core/CardContent";

import "./card.css";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  bold: {
    fontWeight: 500,
    marginLeft: 10,
  },
});

export default function OutlinedCard(props) {
  const classes = useStyles();

  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <div className="card-wrap">
          <div className="card-seq">
            Nº Recebimento:
            <div className={classes.bold}>{props.nroRec}</div>
          </div>
          <div className="card-seq">
            Data: <div className={classes.bold}>{props.datRec}</div>
          </div>
        </div>
        <div className="sub-info">
          <div>
            Revisão:<span className={classes.bold}>{props.codRev}</span>
          </div>
          <div>
            Emissão:<span className={classes.bold}>{props.datEmi}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
