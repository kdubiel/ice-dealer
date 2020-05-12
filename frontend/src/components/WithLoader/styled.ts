import styled from 'styled-components';
import CircularProgress, {
  CircularProgressProps,
} from '@material-ui/core/CircularProgress';

const Wrapper = styled.div`
  position: relative;
`;

const LoaderContainer = styled.div`
  position: absolute;

  width: 100%;
  height: 100%;

  display: flex;
  align-items: center;
  justify-content: center;
`;

const ChildrenContainer = styled.div<{ loading: string }>`
  opacity: ${props => (props.loading === 'true' ? '30%' : 'inherit')};
  pointer-events: ${props => (props.loading === 'true' ? 'none' : 'initial')};
`;

const Loader = styled(CircularProgress)<CircularProgressProps>``;

export default {
  Wrapper,
  LoaderContainer,
  Loader,
  ChildrenContainer,
};
