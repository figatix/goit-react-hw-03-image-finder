
import React, { Component } from 'react';
import { StyledModal, StyledOverlay } from './Modal.styled';

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
    const { id, srcOriginal, alt } = this.props.currentImg;
    console.log(srcOriginal);
    return (

      <StyledOverlay className='overlay'>
        <StyledModal >
          <img id={id} src={srcOriginal} alt={alt} width="500" />
        </StyledModal>
      </StyledOverlay>
    )
  }
}