import {
  Checkbox as MaterialCheckbox,
  CheckboxProps,
  FormControlLabel,
  FormControlLabelProps,
} from '@material-ui/core';
import styled from 'styled-components';

const Checkbox = styled(MaterialCheckbox)<CheckboxProps>``;

const Checkbox__Text = styled(FormControlLabel)<FormControlLabelProps>``;

export const Styled = {
  Checkbox,
  Checkbox__Text,
};
