import React, { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

const Minimal = ({ children }: Props) => {
  return <div>{children}</div>;
};

export default Minimal;
