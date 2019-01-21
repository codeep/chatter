import React from 'react';

import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';

type Props = {
  label: string;
  name: string;
  value: string;
  values?: any;
  errors?: any;
  touched?: any;
  handler?: (...args: any[]) => void;
  type: string;
  formControlProps?: object;
  inputProps?: object;
};

const InputRenderer = (props: Props) => {
  const { label, name, value, values, errors, touched, handler, type, formControlProps, inputProps } = props;
  const errCondition = errors && touched && errors[name] && touched[name];

  const Tag = type === 'select'
    ? <Select
      error={errCondition}
      onChange={handler}
      value={value}
      inputProps={{
        id: name,
        name,
      }}
      {...inputProps}
    >
      {
        values &&
        Object.keys(values).map((key) => <MenuItem key={key} value={key}>{values[key]}</MenuItem>)
      }
    </Select>
    : <TextField
      error={errCondition}
      type={type}
      label={label}
      onChange={handler}
      name={name}
      value={value}
      {...inputProps}
    />;

  return (
    <FormControl {...formControlProps} error={errCondition}>
      { type === 'select' && <InputLabel htmlFor={name}>{label}</InputLabel> }
      { Tag }
      { errCondition && <FormHelperText>{errors[name]}</FormHelperText> }
    </FormControl>
  );
};

export default InputRenderer;
