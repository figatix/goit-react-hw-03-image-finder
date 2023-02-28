import LoadMoreBtn from 'components/Button/Button';
import ImageGalleryItem from 'components/ImageGalleryItem'
import Loader from 'components/Loader';

import React, { Component } from 'react';
import { toast } from 'react-toastify';
import { StyledImageGallery } from './ImageGallery.styled';
import PropTypes from 'prop-types'


export default class ImageGallery extends Component {
  static propTypes = {
    queryHits: PropTypes.arrayOf(PropTypes.shape()).isRequired,
    status: PropTypes.string.isRequired,
    isLoading: PropTypes.bool.isRequired,
    handleMoreBtnClick: PropTypes.func.isRequired,
    isLoadMoreVisible: PropTypes.bool.isRequired,
  }



  render() {
    const { queryHits, status, error, isLoading, isLoadMoreVisible, handleMoreBtnClick } = this.props;


    if (status === 'rejected') {
      toast.error(`Something went wrong..${error.message}`)
      return <div>{error.message}</div>
    }

    const galleryItems = queryHits.map(img => (
      <ImageGalleryItem
        key={img.id}
        id={img.id}
        src={img.webformatURL}
        srcOriginal={img.largeImageURL}
        alt={img.tags}
        images={queryHits}
      />
    ));
    return (
      <>
        <StyledImageGallery className='gallery' >
          {galleryItems}
        </StyledImageGallery>

        {isLoading && <Loader />}
        {isLoadMoreVisible && <LoadMoreBtn onClick={handleMoreBtnClick} />}
      </>
    )
  }

}