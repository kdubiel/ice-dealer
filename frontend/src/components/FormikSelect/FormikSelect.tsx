import React from 'react';
import { Select, SelectProps } from 'components';
import { useField } from 'formik';

interface FormikSelectProps extends SelectProps {
  name: string;
}

const FormikSelect = ({
  name,
  helperText,
  ...otherProps
}: FormikSelectProps) => {
  const [field, { error, touched }] = useField(name);
  const errorMessage = touched && error ? error : null;
  return (
    <Select
      {...otherProps}
      {...field}
      error={!!error && touched}
      helperText={errorMessage || helperText}
    />
  );
};

export default FormikSelect;
