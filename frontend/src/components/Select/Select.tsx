import FormHelperText from '@material-ui/core/FormHelperText';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import MaterialSelect, {
  SelectProps as MaterialSelectProps,
} from '@material-ui/core/Select';
import React, { useState, useRef, useEffect } from 'react';
import Styled from './styled';

interface SelectOption {
  label: string;
  value: string | number;
}

export interface SelectProps
  extends Omit<
    MaterialSelectProps,
    'input' | 'label' | 'labelWidth' | 'margin'
  > {
  options: SelectOption[];
  label: string;
  addEmptyValue?: boolean;
  helperText?: string | null;
  error?: boolean;
  margin?: 'none' | 'dense' | 'normal';
}

const Select = ({
  options,
  id,
  labelId,
  label,
  error,
  addEmptyValue,
  fullWidth,
  helperText,
  required,
  variant,
  margin,
  ...otherProps
}: SelectProps) => {
  const label_id = labelId || `${id}-label`;
  const inputLabel = useRef<HTMLLabelElement>(null);
  const [labelWidth, setLabelWidth] = useState(0);
  useEffect(() => {
    if (inputLabel.current) {
      setLabelWidth(inputLabel.current.clientWidth);
    }
  }, [inputLabel]);
  return (
    <Styled.FormControl
      fullWidth={fullWidth}
      error={error}
      required={required}
      variant={variant}
      margin={margin}
    >
      <InputLabel ref={inputLabel} id={label_id}>
        {label}
      </InputLabel>
      <MaterialSelect
        id={id}
        labelId={label_id}
        fullWidth={fullWidth}
        variant={variant}
        labelWidth={labelWidth}
        {...otherProps}
      >
        {addEmptyValue ? <MenuItem value=""></MenuItem> : null}
        {options.map(({ label, value }, idx) => (
          <MenuItem value={value} key={`${label}_${value}_${idx}`}>
            {label}
          </MenuItem>
        ))}
      </MaterialSelect>
      {helperText ? <FormHelperText>{helperText}</FormHelperText> : null}
    </Styled.FormControl>
  );
};

export default Select;
