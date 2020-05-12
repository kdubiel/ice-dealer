import { AppBar, Button, Hidden, IconButton, Toolbar } from '@material-ui/core';
import { Flex, LogoutButton } from 'components';
import React from 'react';
import { Link as RouterLink, LinkProps } from 'react-router-dom';
import styled from 'styled-components';
import AcUnit from '@material-ui/icons/AcUnit';
import Menu from '@material-ui/icons/Menu';

interface Props {
  onSidebarOpen: () => void;
}

const StyledLogo = styled(RouterLink)<LinkProps>`
  color: white;
  text-decoration: none;
`;

const Topbar = ({ onSidebarOpen }: Props) => {
  return (
    <AppBar>
      <Toolbar>
        <Button startIcon={<AcUnit />} style={{ color: 'white' }}>
          <StyledLogo to="/">
            <span>Ice Dealer</span>
          </StyledLogo>
        </Button>
        <Flex.Grow />
        <LogoutButton />
        <Hidden lgUp>
          <IconButton color="inherit" onClick={onSidebarOpen}>
            <Menu />
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
};

export default Topbar;
