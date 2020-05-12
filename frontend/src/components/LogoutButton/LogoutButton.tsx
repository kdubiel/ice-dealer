import { useLazyQuery } from '@apollo/react-hooks';
import { IconButton } from '@material-ui/core';
import Input from '@material-ui/icons/Input';
import { AuthContext } from 'context';
import { LogoutQueryData, LOGOUT_QUERY } from 'gql';
import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';

interface Props {}

const LogoutButton = () => {
  const history = useHistory();
  const { dispatchToAuth } = useContext(AuthContext);
  const [lazyLogout] = useLazyQuery<LogoutQueryData>(LOGOUT_QUERY, {
    onCompleted: () => {
      dispatchToAuth({ type: 'loggedOut' });
      history.push('/');
    },
    fetchPolicy: 'network-only',
  });

  return (
    <IconButton
      color="inherit"
      onClick={() => {
        lazyLogout();
      }}
    >
      <Input />
    </IconButton>
  );
};

export default LogoutButton;
