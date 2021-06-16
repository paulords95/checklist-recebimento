import React from "react";

import RadioGroup from "@material-ui/core/RadioGroup";

import FormControl from "@material-ui/core/FormControl";

export default function RadioBtn(props) {
  return (
    <FormControl component="fieldset">
      <RadioGroup
        defaultValue="female"
        aria-label="gender"
        name="customized-radios"
      >
        <div style={{ display: "flex" }}>{props.input}</div>
      </RadioGroup>
    </FormControl>
  );
}
