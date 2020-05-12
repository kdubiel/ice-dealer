import { ButtonProps } from '@material-ui/core/Button';
import React from 'react';
import { Styled } from './styled';

interface Props extends ButtonProps {
  isLoading?: boolean;
}

const Button = ({ children, isLoading, ...otherProps }: Props) => {
  return (
    <Styled.Button {...otherProps}>
      <Styled.Button__Text>
        {isLoading ? (
          <Styled.Button__Loader
            color="secondary"
            disableShrink={true}
            size={24}
          />
        ) : (
          children
        )}
      </Styled.Button__Text>
    </Styled.Button>
  );
};

export default Button;
