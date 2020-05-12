import {
  Drawer,
  DrawerProps,
  Divider as MaterialDivider,
} from '@material-ui/core';
import { NavLink, NavLinkProps } from 'react-router-dom';
import styled from 'styled-components';
import { breakpoints } from 'styles';

const StyledDrawer = styled(Drawer)<DrawerProps>`
  .MuiDrawer-paper {
    width: 240px;
    background-color: white;
    margin-top: ${props => props.theme.topBar.mobile.height};
    height: calc(100% - (${props => props.theme.topBar.mobile.height}));

    @media ${breakpoints.sm} {
      margin-top: ${props => props.theme.topBar.desktop.height};
      height: calc(100% - (${props => props.theme.topBar.desktop.height}));
    }

    align-items: center;
  }
`;

const Link = styled(NavLink)<NavLinkProps>`
  color: #37474f;
  width: 100%;
  padding: 10px 8px;
  justify-content: flex-start;
  text-decoration: none;

  text-align: center;

  &:hover {
    background-color: rgba(38, 50, 56, 0.04);
  }
`;

const Link__Text = styled.span`
  width: 100%;
  display: inherit;
  align-items: inherit;
  justify-content: inherit;
  font-weight: 500;

  ${Link}.active & {
    color: #3f51b5;
  }
`;

const Divider = styled(MaterialDivider)`
  width: 90%;
`;

const Link__Icon = styled.span``;

export default {
  Drawer: StyledDrawer,
  Link,
  Link__Text,
  Link__Icon,
  Divider,
};
