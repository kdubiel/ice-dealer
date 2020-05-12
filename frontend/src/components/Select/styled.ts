import styled from 'styled-components';
import MaterialFormControl, {
  FormControlProps,
} from '@material-ui/core/FormControl';

const FormControl = styled(MaterialFormControl)<FormControlProps>`
  &.MuiFormControl-root {
    min-width: 120px;
  }
`;

export default {
  FormControl,
};
