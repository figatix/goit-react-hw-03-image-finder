import ImageGalleryItem from 'components/ImageGalleryItem'
import React, { Component } from 'react';
import { StyledImageGalley } from './ImageGallery.styled';


export default class ImageGallery extends Component {


  render() {
    const { images } = this.props;

    return (
      <StyledImageGalley>
        {/* <!-- Набір <li> із зображеннями --> */}
        {
          images.map((img) => {
            return (
              <ImageGalleryItem
                src={img.srcSmall}
                srcOriginal={img.srcOriginal}
                alt={img.alt}
                key={img.id}
                id={img.id}
                images={images} />
            )
          })
        }
      </StyledImageGalley>
    )
  }
}
