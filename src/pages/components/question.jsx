import React from "react";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";

const FormQuestion = (props) => {
  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">{props.question}</FormLabel>
      <RadioGroup
        aria-label="gender"
        name="gender1"
        value={props.value}
        onChange={props.handleChange}
        style={{ margin: "auto", paddingBottom: "70px" }}
        row
      >
        <FormControlLabel value="1" control={<Radio />} label="Sim" />
        <FormControlLabel value="2" control={<Radio />} label="Não" />
        <FormControlLabel value="3" control={<Radio />} label="Não aplicável" />
      </RadioGroup>
    </FormControl>
  );
};

export default FormQuestion;
