
import Modal from 'components/Modal';
import React, { Component } from 'react';
import { StyledImageGalleryItem, StyledImageGalleryItemImg } from './ImageGalleryItem.styled';

export default class ImageGalleryItem extends Component {

  state = {
    isOpenModal: false,
    currentImg: null,
  }

  handlerCurrentImg = (id) => {
    const currImg = this.props.images.find(el => el.id === id)
    this.setState({
      currentImg: currImg,
      isOpenModal: true,
    })
  }

  onCloseModal = (e) => {
    if (e.code === "Escape") {
      this.setState({
        isOpenModal: false,
      })
    }
    if (e.target === e.currentTarget) {
      this.setState({
        isOpenModal: false,
      })
    }
  }

  render() {
    const { id, src, alt, srcOriginal } = this.props;


    return (
      <StyledImageGalleryItem>
        <StyledImageGalleryItemImg src={src} alt={alt} onClick={() => this.handlerCurrentImg(id)} />
        {
          this.state.isOpenModal &&
          <Modal
            onCloseModal={this.onCloseModal}
          >
            <img id={id} src={srcOriginal} alt={alt} width="500" />
          </Modal>
        }
      </StyledImageGalleryItem>
    )
  }

}






