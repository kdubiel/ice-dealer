import React from 'react';
import Styled from './styled';
import { WithLoaderProps } from './types';

const renderLoader = (loading: boolean) => {
  if (loading) {
    return (
      <Styled.LoaderContainer>
        <Styled.Loader />
      </Styled.LoaderContainer>
    );
  }
};

const WithLoader = ({ children, loading = true }: WithLoaderProps) => {
  return (
    <Styled.Wrapper>
      {renderLoader(loading)}
      <Styled.ChildrenContainer loading={loading.toString()}>
        {children}
      </Styled.ChildrenContainer>
    </Styled.Wrapper>
  );
};

export default WithLoader;
