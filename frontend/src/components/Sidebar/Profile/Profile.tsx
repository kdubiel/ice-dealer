import { AuthContext } from 'context';
import React, { useContext } from 'react';
import Styled from './styled';

interface Props {}

const Profile = (_: Props) => {
  const { user } = useContext(AuthContext);

  if (!user) return null;

  const { name, email } = user;

  return (
    <Styled.Container>
      <Styled.Avatar__Container>
        <Styled.Avatar>
          <Styled.Avatar__Icon />
        </Styled.Avatar>
      </Styled.Avatar__Container>
      <Styled.Text>{name}</Styled.Text>
      <Styled.Text>{email}</Styled.Text>
    </Styled.Container>
  );
};

export default Profile;
