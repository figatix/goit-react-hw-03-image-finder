
import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import { StyledModal, StyledOverlay } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root')

export default class Modal extends Component {

  componentDidMount() {
    window.addEventListener('keydown', this.props.onCloseModal)
    const overlay = document.querySelector('.overlay')
    overlay.addEventListener('click', this.props.onCloseModal)
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.props.onCloseModal);
    const overlay = document.querySelector('.overlay');
    overlay.removeEventListener('click', this.props.onCloseModal);
  }


  render() {
    // const { id, srcOriginal, alt } = this.props.currentImg;
    // console.log(this.props.currentImg);
    return createPortal(

      <StyledOverlay className='overlay'>
        <StyledModal >
          {this.props.children}
        </StyledModal>
      </StyledOverlay>,
      modalRoot
    )
  }
}