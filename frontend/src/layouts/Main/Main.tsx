import { useMediaQuery } from '@material-ui/core';
import { Sidebar, Topbar } from 'components';
import React, { ReactNode, useState } from 'react';
import { breakpoints } from 'styles';
import Styled from './styled';

interface Props {
  children: ReactNode;
}

const Main = ({ children }: Props) => {
  const isDesktop = useMediaQuery(breakpoints.lg, {
    defaultMatches: true,
  });

  const [sidebarOpened, setSidebarOpened] = useState(false);

  const shouldOpenSidebar = isDesktop ? true : sidebarOpened;

  return (
    <Styled.Container shiftContent={isDesktop}>
      <Topbar onSidebarOpen={() => setSidebarOpened(true)} />
      <Sidebar
        onClose={() => setSidebarOpened(false)}
        open={shouldOpenSidebar}
        variant={isDesktop ? 'persistent' : 'temporary'}
      />
      <Styled.Content>{children}</Styled.Content>
    </Styled.Container>
  );
};

export default Main;
