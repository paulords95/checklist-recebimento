import React, { useState } from "react";
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";
import SearchIcon from "@material-ui/icons/Search";

import { makeStyles } from "@material-ui/core/styles";
import "./checklist.css";

import ChecklistTabs from "../components/ChecklistTabs/CheckListTabs";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

const CheckList = ({ setAuth }) => {
  const classes = useStyles();
  const [itemSeq, setItemSeq] = useState(0);
  const [renderItem, setRenderItem] = useState(false);
  const [itemInfo, setItemInfo] = useState([]);

  const SearchItem = async () => {
    const response = await fetch(
      `http://192.168.2.39:1106/item/search/chklst=${itemSeq}`,
      {
        headers: {
          Token: localStorage.token.toString(),
        },
      }
    );
    const itemData = await response.json();

    if (itemData.codRec) {
      console.log(itemData);
      setRenderItem(true);
    } else {
      console.log(itemData);
      setItemInfo(itemData);
      setRenderItem(false);
    }
  };

  return (
    <div>
      <div style={{ right: "5%", position: "absolute", paddingBottom: 10 }}>
        <Button
          onClick={(e) => {
            e.preventDefault();
            localStorage.clear();
            setAuth(false);
          }}
        >
          Sair
        </Button>
      </div>
      <div className="checklist-wrap">
        Checklist de recebimento
        <div style={{ marginTop: 40 }}>
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

          {renderItem ? <ChecklistTabs /> : <div>{itemInfo}</div>}
        </div>
      </div>
    </div>
  );
};

export default CheckList;
