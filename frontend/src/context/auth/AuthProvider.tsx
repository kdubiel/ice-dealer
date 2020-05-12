import { useQuery } from '@apollo/react-hooks';
import { AuthContext } from 'context';
import { REFRESH_QUERY, RefreshQueryData } from 'gql';
import React, { useReducer, useMemo } from 'react';
import { AuthState, AuthAction } from './types';
import { WithLoader } from 'components';

interface Props {
  children: React.ReactNode;
}

const initialState: AuthState = {
  initialized: false,
  user: null,
};

const authReducer = (state: AuthState, action: AuthAction) => {
  switch (action.type) {
    case 'initialized':
      return {
        ...state,
        user: null,
        initialized: true,
      };
    case 'refreshed':
    case 'loggedIn':
      if (!action.payload) {
        throw new Error();
      }
      localStorage.setItem('accessToken', action.payload.token);
      return {
        ...state,
        initialized: true,
        user: action.payload,
      };
    case 'loggedOut':
      localStorage.removeItem('accessToken');
      return {
        ...state,
        user: null,
      };
    default:
      throw new Error();
  }
};

const AuthProvider = ({ children }: Props) => {
  const [{ user, initialized }, dispatchToAuth] = useReducer(
    authReducer,
    initialState
  );
  useQuery<RefreshQueryData>(REFRESH_QUERY, {
    onCompleted: data => {
      dispatchToAuth({ type: 'refreshed', payload: data.refresh });
    },
    onError: () => {
      localStorage.removeItem('accessToken');
      dispatchToAuth({ type: 'initialized' });
    },
    pollInterval: 1000 * 60 * 12,
    fetchPolicy: 'network-only',
    notifyOnNetworkStatusChange: true,
  });

  return useMemo(
    () => (
      <AuthContext.Provider
        value={{
          user,
          dispatchToAuth,
        }}
      >
        {initialized ? (
          children
        ) : (
          <WithLoader loading={true}>&nbsp;</WithLoader>
        )}
      </AuthContext.Provider>
    ),
    [user, initialized, children]
  );
};

export default AuthProvider;
