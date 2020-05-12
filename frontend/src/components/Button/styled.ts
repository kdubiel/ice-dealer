import * as MaterialButton from '@material-ui/core/Button';
import CircularProgress, {
  CircularProgressProps,
} from '@material-ui/core/CircularProgress';
import styled from 'styled-components';

const Button = styled(MaterialButton.default)<MaterialButton.ButtonProps>``;

const Button__Text = styled.span`
  ${Button}:hover & {
    color: lightgray;
  }
`;

const Button__Loader = styled(CircularProgress)<CircularProgressProps>``;

export const Styled = {
  Button,
  Button__Text,
  Button__Loader,
};
