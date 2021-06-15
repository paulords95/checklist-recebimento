import React, { useState } from "react";
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";
import SearchIcon from "@material-ui/icons/Search";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import "./checklist.css";

import ChecklistTabs from "../components/ChecklistTabs/CheckListTabs";
import OutlinedCard from "../components/Card/Card";

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
  const [itemInfoValid, setItemInfoValid] = useState([]);

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
      setItemInfoValid(itemData);
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
        <Typography component="h1" variant="h4">
          Checklist de Recebimento
        </Typography>

        <div style={{ marginTop: 40 }}>
          <form
            className={classes.root}
            noValidate
            autoComplete="off"
            onSubmit={(e) => e.preventDefault()}
          >
            <Input
              onChange={(e) => {
                const regex = /[.,\s]/g;
                const string = e.target.value.toString().replace(regex, "");
                setItemSeq(string);
              }}
              inputProps={{ "aria-label": "description" }}
            />
            <Button onClick={SearchItem}>
              <SearchIcon />
            </Button>
          </form>
          {renderItem ? (
            <OutlinedCard
              nroRec={itemInfoValid.codRec.toLocaleString("pt-BR")}
              datRec={itemInfoValid.datRec}
              codRev={itemInfoValid.codRev}
              datEmi={itemInfoValid.datEmi}
            />
          ) : (
            ""
          )}
          <div style={{ paddingTop: 30 }}>
            {renderItem ? <ChecklistTabs /> : <div>{itemInfo}</div>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckList;
