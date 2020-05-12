import { Checkbox, CheckboxProps } from 'components';
import { useField } from 'formik';
import React from 'react';

interface FormikCheckboxProps extends CheckboxProps {
  name: string;
}

const FormikCheckbox = (props: FormikCheckboxProps) => {
  const [{ value, ...field }] = useField(props.name);
  return <Checkbox {...props} {...field} checked={value} />;
};

export default FormikCheckbox;
