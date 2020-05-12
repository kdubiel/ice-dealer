import Modal, { ModalProps } from '@material-ui/core/Modal';
import Backdrop, { BackdropProps } from '@material-ui/core/Backdrop';
import Fade, { FadeProps } from '@material-ui/core/Fade';
import styled from 'styled-components';

const StyledModal = styled(Modal)<ModalProps>``;

const StyledBackdrop = styled(Backdrop)<BackdropProps>``;

const StyledFade = styled(Fade)<FadeProps>``;

const Container = styled.div`
  position: fixed;

  min-width: 300px;

  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;

export default {
  Modal: StyledModal,
  Backdrop: StyledBackdrop,
  Fade: StyledFade,
  Container,
};
