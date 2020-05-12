import { NavLink, NavLinkProps } from 'react-router-dom';
import styled from 'styled-components';

const Link = styled(NavLink)<NavLinkProps>`
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

export default {
  Link,
};
