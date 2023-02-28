import LoadMoreBtn from 'components/Button/Button';
import ImageGalleryItem from 'components/ImageGalleryItem'
import Loader from 'components/Loader';
import { getImages } from 'components/services/Api';
import React, { Component } from 'react';
import { toast } from 'react-toastify';
import { StyledImageGallery } from './ImageGallery.styled';
import PropTypes from 'prop-types'


export default class ImageGallery extends Component {
  static propTypes = {
    query: PropTypes.string.isRequired,
  }

  state = {
    queryHits: [],
    totalHits: 0,
    status: 'idle',
    error: null,
    page: 1,
    isLoading: false,
  }

  componentDidUpdate(prevProps, prevState) {
    const { query, } = this.props;
    const { page } = this.state;
    const isQueryChanged = prevProps.query !== query;
    const isPageChanged = prevState.page !== page;

    if (isQueryChanged) {
      this.setState({
        queryHits: [],
        totalHits: 0,
        page: 1,
        error: null
      }, () => {
        this.fetchImages();
      });
    }

    if (isPageChanged) {
      this.fetchImages();
    }
  }

  fetchImages = async () => {
    const { page } = this.state;
    const { query } = this.props;

    this.setState({ isLoading: true })

    try {
      const { hits, totalHits } = await getImages(query, page)

      if (totalHits === 0) {
        toast.error(`Oops... We can't find ${this.props.query} `)
        return this.setState({
          status: 'idle',
          totalHits: 0,
          page: 1,
        })
      }

      if (page === 1) {
        this.setState({
          queryHits: hits,
          totalHits,
        })
      } else {
        this.setState((prevState) => ({
          queryHits: [...prevState.queryHits, ...hits],
          totalHits,
        }))
      }

    } catch (error) {
      toast.error(error.message)
      this.setState({ error, status: 'rejected' })
    } finally {
      this.setState({ isLoading: false }
        , () => {
          if (this.state.page !== 1) {
            this.scroll();
          }
        }
      );
    }
  }

  handleMoreBtnClick = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  }

  scroll = () => {
    const { height: cardHeight } = document
      .querySelector('.gallery')
      .firstElementChild.getBoundingClientRect();

    window.scrollBy({
      top: cardHeight * 1.5,
      behavior: 'smooth',
    });
  }

  render() {
    const { queryHits, status, error, totalHits, isLoading, page } = this.state;
    const isLoadMoreVisible = queryHits.length < totalHits && (page < Math.ceil(totalHits / 12));

    if (status === 'rejected') {
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
        {isLoadMoreVisible && <LoadMoreBtn onClick={this.handleMoreBtnClick} />}
      </>
    )
  }
}
