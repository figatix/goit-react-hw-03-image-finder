
import React, { Component } from 'react';
import { StyledImageGalleryItem, StyledImageGalleryItemImg } from './ImageGalleryItem.styled';

export default class ImageGalleryItem extends Component {

  render() {
    const { id, src, alt, onImgClick } = this.props;

    return (
      <StyledImageGalleryItem>
        <StyledImageGalleryItemImg src={src} alt={alt} onClick={() => onImgClick(id)} />
      </StyledImageGalleryItem>
    )
  }

}






