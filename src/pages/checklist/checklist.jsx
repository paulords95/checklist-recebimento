import React, { useState, useEffect } from "react";
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";
import SearchIcon from "@material-ui/icons/Search";

import { makeStyles } from "@material-ui/core/styles";
import "./checklist.css";

import Dialog from "../Dialog/Dialog";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

const CheckList = () => {
  const classes = useStyles();
  const [itemSeq, setItemSeq] = useState(0);

  const SearchItem = async () => {
    const response = await fetch(
      `http://192.168.2.39:1106/item/search/chklst=${itemSeq}`,
      {
        headers: {
          Token: localStorage.token.toString(),
        },
      }
    );
    console.log(await response.json());
  };

  return (
    <div className="checklist-wrap">
      Home
      <div>
        <form className={classes.root} noValidate autoComplete="off">
          <Input
            onChange={(e) => {
              setItemSeq(e.target.value);
            }}
            inputProps={{ "aria-label": "description" }}
          />
          <Button onClick={SearchItem}>
            <SearchIcon />
          </Button>
        </form>
      </div>
    </div>
  );
};

export default CheckList;
