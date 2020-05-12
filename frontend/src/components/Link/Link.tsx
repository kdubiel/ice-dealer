import React from 'react';
import Styled from './styled';
import { NavLinkProps } from 'react-router-dom';

interface Props extends NavLinkProps {}

const Link = ({ children, to }: Props) => {
  return <Styled.Link to={to}>{children}</Styled.Link>;
};

export default Link;
