import ImageGalleryItem from 'components/ImageGalleryItem'
import React, { Component } from 'react';
import { StyledImageGalley } from './ImageGallery.styled';


export default class ImageGallery extends Component {

  render() {
    const { images, onImgClick } = this.props;

    return (
      <StyledImageGalley>
        {/* <!-- Набір <li> із зображеннями --> */}
        {
          images.map((img) => {
            return (
              <ImageGalleryItem
                src={img.srcSmall}
                alt={img.alt}
                key={img.id}
                id={img.id}
                onImgClick={onImgClick} />
            )
          })
        }
      </StyledImageGalley>
    )
  }
}
