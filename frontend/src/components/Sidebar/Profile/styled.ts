import { Avatar as MaterialAvatar, AvatarProps } from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import styled from 'styled-components';

const Container = styled.div`
  padding: 10px;
  width: 100%;

  display: flex;
  flex-direction: column;
`;

const Avatar__Container = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
`;

const Avatar = styled(MaterialAvatar)<AvatarProps>`
  &.MuiAvatar-root {
    cursor: pointer;
    text-align: center;
  }
`;

const Avatar__Icon = styled(AccountCircleIcon)`
  &.MuiSvgIcon-root {
    align-self: center;
    font-size: 2rem;
  }
`;

const Text = styled.span`
  text-align: center;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export default {
  Container,
  Avatar__Container,
  Avatar,
  Avatar__Icon,
  Text,
};
