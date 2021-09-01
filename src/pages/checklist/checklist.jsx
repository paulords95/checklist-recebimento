import React, { useState } from "react";
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";
import SearchIcon from "@material-ui/icons/Search";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import "./checklist.css";

import ENDPOINT from "../../utils/endpoint";

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
  const [itemLoading, setItemLoading] = useState(false);

  const SearchItem = async () => {
    setRenderItem(false);
    setItemInfo("");
    setItemLoading(true);
    const response = await fetch(
      `${ENDPOINT.ENDPOINT}/item/search/chklst=${itemSeq}`,
      {
        headers: {
          Token: localStorage.token.toString(),
        },
      }
    );
    const itemData = await response.json();

    if (itemData[0].USU_CODREC) {
      setItemInfoValid(itemData[0]);
      setRenderItem(true);
      setItemLoading(false);
    } else {
      setItemInfo("itemData[0]");
      setRenderItem(false);
      setItemLoading(false);
    }

    if (response.status === 403) {
      setAuth(false);
      setItemLoading(false);
    }
  };

  const formatDate = (date) => {
    const d = date;
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    const formatBr = new Date(d)
      .toLocaleDateString("pt-BR", options)
      .split("-")
      .reverse()
      .join("/");

    return formatBr;
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          right: "5%",
          position: "absolute",
          paddingBottom: 10,
          marginTop: 5,
        }}
      >
        <div>
          <Typography> {localStorage.getItem("nomUsu")} |</Typography>
        </div>
        <Button
          color="primary"
          onClick={(e) => {
            e.preventDefault();
            localStorage.clear();
            setAuth(false);
          }}
        >
          Desconectar
        </Button>
      </div>
      <div className="checklist-wrap">
        <Typography component="h1" variant="h4">
          CHECKLIST DE RECEBIMENTO
        </Typography>

        <div style={{ marginTop: 40 }}>
          <form
            className={classes.root}
            noValidate
            autoComplete="off"
            onSubmit={(e) => e.preventDefault()}
          >
            <Input
              type="number"
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
          <div style={{ paddingTop: "40px" }}>
            {itemLoading ? <CircularProgress /> : ""}
          </div>
          {renderItem ? (
            <OutlinedCard
              nroRec={itemInfoValid.USU_CODREC.toLocaleString("pt-BR")}
              datRec={formatDate(itemInfoValid.USU_DATREC)}
              codRev={itemInfoValid.USU_CODREV}
              datEmi={formatDate(itemInfoValid.USU_DATEMI)}
            />
          ) : (
            ""
          )}
          <div style={{ paddingTop: 30 }}>
            {renderItem ? (
              <ChecklistTabs
                seqRec={itemInfoValid}
                onClickBtn={(e) => {
                  if (e.currentTarget.id === "1") {
                    console.log("First Dialog");
                  }
                  if (e.currentTarget.id === "2") {
                    console.log("Second Dialog");
                  }
                  if (e.currentTarget.id === "3") {
                    console.log("Third Dialog");
                  }
                }}
              />
            ) : (
              <div>{itemInfo}</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckList;
