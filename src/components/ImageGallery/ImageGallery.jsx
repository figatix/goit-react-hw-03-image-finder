import LoadMoreBtn from 'components/Button/Button';
import ImageGalleryItem from 'components/ImageGalleryItem'
import Loader from 'components/Loader';
import { getImages } from 'components/services/Api';
import React, { Component } from 'react';
import { toast } from 'react-toastify';
import { StyledImageGallery } from './ImageGallery.styled';



export default class ImageGallery extends Component {

  state = {
    queryHits: [],
    total: 0,
    totalHits: 0,
    status: 'idle',
    error: null,
    page: 1,
  }

  componentDidUpdate(prevProps, prevState) {
    const { query, } = this.props;
    const { page } = this.state;
    const isQueryChanged = prevProps.query !== query;
    const isPageChanged = prevState.page !== page;

    if (isQueryChanged || isPageChanged) {
      this.fetchImages();
    }
  }

  fetchImages = async () => {
    const { page } = this.state;
    const { query } = this.props;

    this.setState({ status: 'pending' })

    try {
      const { hits, total, totalHits } = await getImages(query, page)


      if (totalHits === 0) {
        toast.error(`Oops... We don't find anything..`)
        return this.setState({ status: 'idle' })
      }

      return this.setState((prevState) => ({
        queryHits: [...prevState.queryHits, ...hits],
        total,
        totalHits,
        status: 'resolved'
      }))


    } catch (error) {
      toast.error(error.message)
      return this.setState({ error, status: 'rejected' })
    }
  }

  handleMoreBtnClick = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  }


  render() {
    const { queryHits, status, error, totalHits } = this.state;
    // console.log('STATE', this.state);

    if (status === 'idle') {
      return <div>Enter your query</div>
    }

    if (status === 'pending') {
      return <Loader />
    }

    if (status === 'rejected') {
      return <div>{error.message}</div>
    }

    if (status === 'resolved') {
      const galleryItems = queryHits.map(img => (
        <ImageGalleryItem
          key={img.id}
          id={img.id}
          src={img.previewURL}
          srcOriginal={img.largeImageURL}
          alt={img.tags}
          images={queryHits}
        />
      ));
      return (
        <>

          <StyledImageGallery>
            {galleryItems}
          </StyledImageGallery>

          {totalHits > 12 && <LoadMoreBtn onClick={this.handleMoreBtnClick} />}
        </>
      )
    }

  }
}
