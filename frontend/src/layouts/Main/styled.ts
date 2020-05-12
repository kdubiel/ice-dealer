import styled from 'styled-components';
import { breakpoints } from 'styles';

interface ContainerProps {
  shiftContent: Boolean;
}

const Container = styled.div<ContainerProps>`
  padding-left: ${props =>
    props.shiftContent ? props.theme.sideBar.width : 0};

  padding-top: ${props => props.theme.topBar.mobile.height};

  @media ${breakpoints.sm} {
    padding-top: ${props => props.theme.topBar.desktop.height};
  }
`;

const Content = styled.main`
  padding: 10px;

  @media ${breakpoints.lg} {
    padding: 20px 30px;
  }
`;

export default {
  Container,
  Content,
};
