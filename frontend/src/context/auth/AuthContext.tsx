import React from 'react';
import { AuthContextType } from './types';

const AuthContext = React.createContext<AuthContextType>({
  user: null,
  dispatchToAuth: () => {},
});

export default AuthContext;
