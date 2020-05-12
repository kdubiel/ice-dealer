import { UserRole } from 'enums';

export type UserData = {
  userId: string;
  email: string;
  name: string;
  role: UserRole;
  token: string;
};

export type AuthContextType = {
  user: UserData | null;
  dispatchToAuth(action: AuthAction): void;
};

export type AuthState = {
  initialized: boolean;
  user: UserData | null;
};

export type AuthActionTypes =
  | 'loggedIn'
  | 'loggedOut'
  | 'refreshed'
  | 'initialized';

export type AuthAction = { type: AuthActionTypes; payload?: UserData };
