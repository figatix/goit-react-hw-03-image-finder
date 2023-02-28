
import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import { StyledModal, StyledOverlay } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root')

export default class Modal extends Component {

  componentDidMount() {
    window.addEventListener('keydown', this.handlerCloseModal)
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handlerCloseModal);
  }

  handlerCloseModal = (e) => {
    if (e.code === "Escape" || e.target === e.currentTarget) {
      this.props.onCloseModal()
    }
  }

  render() {

    return createPortal(
      <StyledOverlay onClick={this.handlerCloseModal}>
        <StyledModal >
          {this.props.children}
        </StyledModal>
      </StyledOverlay>,
      modalRoot
    )
  }
}