import React from 'react';
import Styled from './styled';
import {
  ModalProps,
  Backdrop,
  Card,
  CardContent,
  CardHeader,
  IconButton,
  CardActions,
} from '@material-ui/core/';
import CloseIcon from '@material-ui/icons/Close';
import { Button, Flex, WithLoader } from 'components';

interface ModalAction {
  label: string;
  handler: Function;
  primary?: boolean;
  disabled?: boolean;
}

interface Props extends ModalProps {
  title?: string;
  actions?: ModalAction[];
  loading?: boolean;
}

const renderTitle = (onClose?: Function, title?: string) =>
  title ? (
    <CardHeader
      title={title}
      action={
        <IconButton
          onClick={() => {
            if (onClose) {
              onClose();
            }
          }}
        >
          <CloseIcon />
        </IconButton>
      }
    />
  ) : null;

const renderActions = (actions?: ModalAction[]) =>
  actions ? (
    <CardActions>
      <Flex.Grow />
      {actions.map(action => (
        <Button
          key={action.label}
          variant="outlined"
          color={action.primary ? 'primary' : 'default'}
          onClick={() => action.handler()}
          disabled={action.disabled}
        >
          {action.label}
        </Button>
      ))}
    </CardActions>
  ) : null;

const Modal = ({
  children,
  title,
  open,
  onClose,
  actions,
  loading,
  ...otherProps
}: Props) => {
  return (
    <Styled.Modal
      BackdropComponent={Backdrop}
      onClose={onClose}
      open={open}
      {...otherProps}
    >
      <Styled.Fade in={open}>
        <Styled.Container>
          <Card>
            {renderTitle(onClose, title)}
            <WithLoader loading={loading}>
              <CardContent>{children}</CardContent>
            </WithLoader>
            {renderActions(actions)}
          </Card>
        </Styled.Container>
      </Styled.Fade>
    </Styled.Modal>
  );
};

export default Modal;
