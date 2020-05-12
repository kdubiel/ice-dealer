import { TextField, TextFieldProps } from 'components';
import { useField } from 'formik';
import React from 'react';

interface Props {
  name: string;
}

type FromikTextFieldProps = Props & TextFieldProps;

const FormikTextField = ({
  name,
  helperText,
  ...otherProps
}: FromikTextFieldProps) => {
  const [field, { error, touched }] = useField(name);
  const errorMessage = touched && error ? error : null;
  return (
    <TextField
      {...otherProps}
      inputProps={{ ...field }}
      error={!!error && touched}
      helperText={errorMessage || helperText}
    />
  );
};

export default FormikTextField;
