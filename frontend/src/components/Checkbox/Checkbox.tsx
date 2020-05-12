import {
  CheckboxProps as MaterialCheckboxProps,
  FormControlLabelProps,
} from '@material-ui/core';
import React from 'react';
import { Styled } from './styled';

export interface CheckboxProps extends MaterialCheckboxProps {
  labelProps: Omit<FormControlLabelProps, 'control' | 'name'>;
}

const Checkbox = ({ labelProps, ...otherProps }: CheckboxProps) => {
  return (
    <Styled.Checkbox__Text
      {...labelProps}
      control={<Styled.Checkbox {...otherProps} />}
    ></Styled.Checkbox__Text>
  );
};

export default Checkbox;
